import Layout from "../components/layout";
// import Image from "next/image";

export default function Home() {
  return (
    <Layout title="Contact | RAVENS">
      <div className="prose text-center max-w-5xl mx-auto pt-12">
        <div className="py-12">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">Contact</h1>
          <div className="relative mx-auto">
            <div className="py-16 px-4">
              <div className="max-w-lg mx-auto lg:max-w-none">
                <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label for="full_name" className="sr-only">Full name</label>
                    <input type="text" name="full_name" id="full_name" autocomplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Full name"/> 
                  </div>
                  <div>
                    <label for="email" className="sr-only">Email</label>
                    <input id="email" name="email" type="email" autocomplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Email"/>
                  </div>
                  <div>
                    <label for="phone" className="sr-only">Phone</label>
                    <input type="text" name="phone" id="phone" autocomplete="tel" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Phone"/>
                  </div>
                  <div>
                    <label for="message" className="sr-only">Message</label>
                    <textarea id="message" name="message" rows="4" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" placeholder="Message"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="hidden lg:inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 hover:bg-gold hover:text-black transition-all">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>


        </div>

        <hr className="border-2 border-gold my-8" />
      </div>
    </Layout>
  );
}
