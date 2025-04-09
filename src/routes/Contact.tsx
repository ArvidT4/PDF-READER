import NavigationBar from "../Components/NavigationBar.tsx";
import Gradient from "../Components/Gradient.tsx";
import { useRef } from "react";
import emailjs from "emailjs-com";
import Layout from "../Components/Layout.tsx";

const Contact = () => {

        const formRef = useRef<HTMLFormElement>(null);

        const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!formRef.current) return;

            emailjs
                .sendForm(
                    "service_6xib4cl",
                    "template_zxtbewj",
                    formRef.current,
                    "JxzEHcMuQlPwft1Pk"
                )
                .then(
                    (result) => {
                        alert("Message sent successfully!");
                        formRef.current?.reset();
                    },
                    (error) => {
                        alert("Something went wrong. Please try again.");
                    }
                );
        };
  return (
    <Layout>
        <Gradient>
            <h1 className={"text-2xl text-white col-span-2 m-auto font-mono"}>Contact</h1>
        </Gradient>
        <div>
            <form
                ref={formRef}
                onSubmit={sendEmail}
                className="flex flex-col gap-4 max-w-md mx-auto p-4 mt-6"
            >
                <input
                    name="user_name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    name="user_email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="border border-gray-300 p-2 rounded"
                />
                <textarea
                    name="message"
                    placeholder="Your message"
                    required
                    className="border border-gray-300 p-2 rounded"
                    rows={5}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    </Layout>
  );
};

export default Contact;