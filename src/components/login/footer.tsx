import { Facebook,Linkedin ,Github} from 'lucide-react';
export function Footer() {
  return (
      <div className="w-full flex justify-between bg-[#d5c5ac] text-xs text-white fixed bottom-0 left-0 p-2">
        <div><a href='mailto:mohamedsougui@gmail.com' className="text-base text-white"> mohamedsougui@gmail.com</a></div> 
        <div className="w-40  flex justify-evenly  text-muted-foreground [&_a]:text-white">
            <a href="https://www.facebook.com/mohamed.sougui.19"><Facebook /></a>
            <a href=""><Linkedin /></a>
            <a href=""><Github /></a>
        </div>
    </div>
    
  )
}