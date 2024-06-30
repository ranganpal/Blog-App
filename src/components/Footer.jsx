import React from 'react'
import { Link } from 'react-router-dom'
import { Logo, Container } from './index'

function Footer() {
  return (
    <footer className="relative overflow-hidden w-full py-10 bg-gray-400 border border-t-2 border-t-black border-x-slate-400">
      <Container>
        <div className="relative z-10 mx-auto">
          <div className="-m-6 flex flex-wrap justify-between">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
              <div className="flex h-full flex-col justify-between">
                <div className="mb-4 inline-flex items-center">
                  <Logo width="70px" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-600">
                  Company
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Features
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Affiliate Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Press Kit
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-600">
                  Support
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Help
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Customer Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-600">
                  Legals
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-gray-900 hover:text-gray-800"
                      to="/"
                    >
                      Licensing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer