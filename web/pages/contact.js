import { useState } from 'react'
import Layout from "../components/layout";
// import Image from "next/image";

/**
 * @TODO
 * validation
 * ui error handling
 * form submission notification
 */

export default function Home() {
  const [name, setName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          emailAddress: emailAddress,
          phoneNumber: phoneNumber,
          message: message
        })
      })

      // if(response?.status === 200){

      // }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title="Contact | RAVENS">
      <div className="prose text-center max-w-5xl mx-auto pt-12">
        <div className="py-12">
          <h1 className="inline-block px-4 lg:px-32 mx-auto pb-10 text-4xl text-center text-gold border-b-2 border-gold uppercase">Contact</h1>
          <div className="relative mx-auto">
            <div className="py-16 px-4">
              <div className="max-w-lg mx-auto lg:max-w-none">
                <form 
                  onSubmit={handleSubmit} 
                  method="POST" 
                  className="grid grid-cols-1 gap-y-6"
                >
                  <div>
                    <label className="sr-only">Full name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-gray-500  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" 
                      placeholder="Full name"/> 
                  </div>
                  <div>
                    <label className="sr-only">Email</label>
                    <input 
                      type="email" 
                      autoComplete="email" 
                      value={emailAddress}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-gray-500  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" 
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Phone</label>
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-gray-500  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" 
                      placeholder="Phone"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="block w-full shadow-sm py-3 px-4 text-gray-500 placeholder-gray-500  focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" 
                      placeholder="Message"
                    ></textarea>
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
