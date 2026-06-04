"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { EmittedField } from "@/types/emitted-field";

export default function EmittedFieldsTable() {

  const [fields, setFields] = useState<
    EmittedField[]
  >([]);

  useEffect(() => {
    api
      .get("/api/emitted-fields")
      .then((res) => {
        setFields(res.data);
      });
  }, []);

  return (
    <div>

      <h2 className="mb-4 text-xl font-semibold">
        Emitted Fields
      </h2>

      <div className="overflow-hidden rounded-xl border border-[#1F2937]">

        <table className="w-full">

          <thead>

            <tr className="bg-[#0B1117]">

              <th className="border-b border-[#1F2937] p-3 text-left">
                Field
              </th>

              <th className="border-b border-[#1F2937] p-3 text-left">
                Value
              </th>

            </tr>

          </thead>

          <tbody>

            {fields.map((item, index) => (

              <tr
                key={index}
                className="border-b border-[#1F2937]"
              >

                <td className="p-3">
                  {item.field}
                </td>

                <td className="p-3 text-cyan-400">
                  {item.value}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}