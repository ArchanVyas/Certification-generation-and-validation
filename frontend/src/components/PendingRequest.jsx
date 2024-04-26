import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import {Table} from "antd"

const PendingRequest = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const columns = [
        {
            title:"Index",
            dataIndex:"index",
            key:"index",
            render: (text, record, index) => page === 1 ? index + 1 : index + 1 + (page - 1) * 5,
        },
        {
            title:"User",
            dataIndex:"user_name",
            key:"user_name",
        },
        {
            title: "Course Name",
            dataIndex: "course_name",
            key: "course_name",
        },
        {
            title: "Template ID",
            dataIndex: "template_Id",
            key: "template_Id",
        },
        {
            title: "Action",
            key: "status",
            render: (text, record) => (
                <div>
                   {
                    record.status?"Accepted":"Rejected"
                   }
                </div>
            ),
        }
    ]

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URI}/course/getCourse/`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();
            console.log(res);
                // Filter data where status is 0
                setData(res.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };
                   
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Requests</h1>
            <div className="z-[-100]">
            <Table dataSource={data}  columns={columns}
            pagination={{pageSize:5}}
                onChange={(pagination) => {
                    setPage(pagination.current);
                }
                }
            />
            </div>
        </div>
    );
};

export default PendingRequest;
