import { useRouter } from "next/navigation";
import { getToken } from "./token";
import { jwtDecode } from "jwt-decode";

export type IPayload = {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  permissions: any[];
  prv: string;
  role: string;
  sub: string;
};

export function redirectBasedRole(token: string) {
  if (!token) return "/auth";
  const jwt = jwtDecode<IPayload>(token);
  console.log("Decoded JWT:" ,jwt);

  if (typeof jwt.role !== 'string') {
    console.error("Invalid role in JWT:", jwt.role);
    return "/auth";
  }

  const role = jwt.role.toLowerCase().replace(" ", "-");
  switch (role) {
    case "supervisor":
      return "/head";
    case "vice-chief":
      return "/c-level";
    case "clevel":
      return "/c-level";  
    case "head":
      return "/head";
    case "co-head":
      return "/co-head";
    case "staff":
      return "/staff";
    default:
      return "/auth";
  }
}
