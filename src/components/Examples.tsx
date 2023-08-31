"use client";
import { useState } from "react";
import QAModal from "./QAModal";
import Image from "next/image";

export default function Examples() {
  const [QAModalOpen, setQAModalOpen] = useState(false);
  return (
    <div>
      <QAModal open={QAModalOpen} setOpen={setQAModalOpen} />
      <ul
        role="list"
        className="mt-14 m-auto max-w-3xl"
      >
        <li
          key="Q&A on documents"
          onClick={() => setQAModalOpen(true)}
          className="col-span-1 flex flex-col rounded-lg bg-slate-800  text-center shadow relative ring-1 ring-white/10 cursor-pointer hover:ring-sky-300/70 transition"
        >
          <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0"></div>
          <div className="flex flex-1 flex-col items-center p-8 w-full">
            <Image
              loader={() =>
                "https://img.freepik.com/free-vector/flat-hotel-building-background_23-2148170580.jpg"
              }
              width={0}
              height={0}
              sizes="100vw"
              className="flex-shrink-0 object-cover w-32 h-32 mx-auto rounded-full"
              src="https://img.freepik.com/free-vector/flat-hotel-building-background_23-2148170580.jpg"
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-white">
              Q&A on documents
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only"></dt>
              <dd className="text-sm text-slate-400">
                Ask questions about Hotels
              </dd>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  );
}
