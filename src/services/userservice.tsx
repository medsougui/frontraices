import axios from "axios";

// Define the structure of user credentials
interface Credentials {
  email: string;
  password: string;
}

// Define the structure of the response from the server
interface User {
  id?: number;
  email: string;
  username: string;
  last_login: Date;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  password:string;
  photo:string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://backend-6a3w.onrender.com/api";

const UserService = {
  /**
   * Login function to authenticate a user by email and password and store the user in local storage.
   * @param {Credentials} credentials 
   * @returns {Promise<User>} 
   */
  login: async (credentials: Credentials): Promise<User> => {
    try {
      // Authenticate the user
      const response = await axios.post<User>(
        `${API_BASE_URL}/auth-users/get-by-email-and-password/`,
        credentials
      );

      const user = response.data;

      // Update user's is_active and last_login fields
      await axios.patch(`${API_BASE_URL}/auth-users/${user.id}/`, {
        is_active: true,
        last_login: new Date().toISOString(), // Set the current system time
      });

      // Store the authenticated user in local storage
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.detail || "Login failed");
      } else {
        throw new Error("An error occurred while logging in");
      }
    }
  },
  
  /**
   * Retrieve the currently logged-in user from local storage.
   * @returns {User | null}
   */
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Log out the user by updating the `is_active` field to `false` and clearing local storage.
   */
  logout: async (): Promise<void> => {
    const currentUser = UserService.getCurrentUser();
    if (currentUser) {
      // Update the user's is_active field to false in the backend
      await axios.patch(`${API_BASE_URL}/auth-users/${currentUser.id}/`, {
        is_active: false,
      });
    }

    // Clear the user from local storage
    localStorage.removeItem("user");
  },
  findByEmail: async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post<boolean>(`${API_BASE_URL}/auth-users/find-by-email/`, { email });
      return response.data;
    } catch (error: any) {
      throw new Error("Error checking email availability");
    }
  },

  /**
   * Create a new user.
   * @param {User} userData
   * @returns {Promise<User>}
   */
  create: async (userData: User): Promise<User> => {
    try {
      const response = await axios.post<User>(`${API_BASE_URL}/auth-users/`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error("Error creating user");
    }
  },

  /**
   * Update user information.
   * @param {number} userId
   * @param {Partial<User>} userData
   * @returns {Promise<User>}
   */
  update: async (userId: number, userData: Partial<User>): Promise<User> => {
    try {
      const response = await axios.patch<User>(`${API_BASE_URL}/auth-users/${userId}/`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error("Error updating user");
    }
  },
  
  sendVerificationEmail: async (email: string): Promise<string> => {
    try {
      // Send the email via the API and get the response
      const response = await axios.post(`https://backend-6a3w.onrender.com/send-verification-email/`, { email });
  
      // Return the verification code from the response
      return response.data.code.toString();
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      throw new Error("Error sending verification email");
    }
  },
  

};

export default UserService;
