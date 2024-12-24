"use client";

import React from "react";
import Input from "./Inputs/Input";
import { AnimatePresence, motion } from "framer-motion";

interface Column {
  className: React.HTMLAttributes<HTMLDivElement>["className"];
  title: string | React.ReactNode;
  key: string | number;
  dataIndex: string;
  render?: (item: any, index: number) => React.ReactNode;
}

interface Props {
  columns: Column[];
  dataSource?: any;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  tableTitle?: string;
  headerBtn?: React.ReactNode;
  rowKey?: any;
  search?: boolean;
  emptyPlaceholder?: React.ReactNode;
}

const Table: React.FC<Props> = ({
  columns,
  dataSource,
  className,
  tableTitle,
  headerBtn,
  rowKey,
  search,
  emptyPlaceholder,
}) => {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className=" w-full flex flex-1 justify-between mb-4 flex-wrap ">
        <h6 className="text-2xl">{tableTitle}</h6>
        {headerBtn && headerBtn}
      </div>
      {search && (
        <Input
          id="test"
          className="mb-4"
          label="Search"
          inputProps={{
            type: "text",
            required: true,
          }}
        />
      )}
      {dataSource?.length > 0 ? (
        <div className={` overflow-x-auto  overflow-y-auto  ${className}`}>
          <div className="inline-block min-w-full  align-middle ">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {columns &&
                      columns.map((col) => {
                        return (
                          <th
                            key={col.key}
                            scope="col"
                            className={`py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 ${col.className} `}
                          >
                            {col.title}
                          </th>
                        );
                      })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 [&>*:nth-child(even)]:bg-gray-50">
                  {dataSource &&
                    dataSource.map((entry: any, index: number) => {
                      return (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          key={dataSource[rowKey]}
                          className="hover:bg-gray-100 transition-all duration-300"
                        >
                          {columns.map((col) => {
                            return (
                              <td
                                key={dataSource[rowKey]}
                                className="px-4 py-4 text-sm font-medium whitespace-nowrap  text-gray-800 dark:text-white "
                              >
                                {col.render
                                  ? col.render(entry, index)
                                  : entry[col.dataIndex]}
                              </td>
                            );
                          })}
                        </motion.tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] text-zinc-600 w-full grid place-content-center">
          {emptyPlaceholder}
        </div>
      )}
    </motion.section>
  );
};

export default Table;
