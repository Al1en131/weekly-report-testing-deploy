import AuthPage from "@/app/auth/page";
import LayoutSuperAdmin from "@/app/auth/layout";
import { render } from "@testing-library/react";

describe("Login Page", () => {
    it("render Login page", () => {
        const { container } = render(<AuthPage />);
        expect(container).toMatchSnapshot();
    });
})

describe("Layout Page", () => {
    it("render Layout page", () => {
        const { container } = render(<LayoutSuperAdmin> </LayoutSuperAdmin>);
        expect(container).toMatchSnapshot();
    });
})


