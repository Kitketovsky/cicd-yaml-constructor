import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get("email");
        const password = data.get("password");

        if (!email) {
            return fail(422, {
                error: "Email is empty"
            })
        }

        if (!password) {
            return fail(422, {
                error: "Password is empty"
            })
        }

        if (password.toString().length < 6) {
            return fail(422, {
                error: "Password must be at least 6 characters"
            })
        }

        throw redirect(301, "/main")
    }
}