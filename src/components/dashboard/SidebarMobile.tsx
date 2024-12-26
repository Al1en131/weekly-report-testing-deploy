import Image from "next/image";
import styles from "@/styles/border.module.css";
import useActive from "@/hooks/useActive";
import Link from "next/link";
import Separator from "./Separator";
import { LogoutIcon } from "../icons";
import useLogout from "@/hooks/useLogout";
import { usePathname } from "next/navigation";

export default function SidebarMobile({
  root,
  navLink,

  profileLink,
  children,
}: {
  root: string;

  navLink: any[];
  children?: React.ReactNode;
  profileLink: string;
}) {
  const { isActive } = useActive();
  const pathname = usePathname();
  // const handleClick = () => setOpen(false);
  const { setIsActive } = useLogout();
  // const [open, setOpen] = useState<boolean>(false);
  return (
    <section
      className={`${styles.border_nav} transition-all ${isActive
          ? "z-20   animate__animated animate__fadeIn"
          : " animate__animated animate__fadeOut !absolute"
        }   flex flex-col bg-[#0D2735] h-full py-6 w-[104px] `}
    >

      <div className="py-2 px-4 relative">
        <Image
          className="w-[60px] h-[60px] mx-auto"
          alt="Logo Candidate College"
          width={100}
          height={100}
          src={"/assets/image/logo-cc.png"}
        />
      </div>

      <div className="  relative   w-full mt-5 px-4 ">
        <div
          className={`${styles.border_link} ${pathname.match(profileLink) && styles.border_link_active
            } justify-center px-3 py-2 flex gap-3 relative`}
        >
          <Image
            src="/assets/image/Avatar.png"
            className="w-[48px] h-[48px] rounded-full"
            width={100}
            height={100}
            alt="Photo Profile"
          />
        </div>
      </div>
      <Separator />
      <div className="mt-4 px-4 overflow-y-auto rm-scroll mx-auto">
        <div className="flex mt-2 relative  flex-col">
          {navLink
            .filter((v) => !v.menu)
            .map(({ title, path, icon }: any, index: number) => {
              return (
                <Link
                  key={index}
                  href={path}
                  className={`${styles.border_link} ${path == root
                      ? pathname == path && styles.border_link_active
                      : pathname.match(path) && styles.border_link_active
                    } w-full rounded-[10px]  px-5 py-3 flex gap-4 items-center justify-center group text-[14px]`}
                >
                  {icon}
                </Link>
              );
            })}
          {children}
        </div>
      </div>

      <div className="flex flex-auto relative justify-end mx-auto items-end">
        <div className={`w-full h-fit`}>
          <button onClick={() => setIsActive()}>
            <LogoutIcon />
          </button>
        </div>
      </div>
      {/* <Logout open={open} onClick={handleClick} /> */}
    </section>
  );
}
