import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function draftshop() {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);

    const [searchQuery, setSearchQuery] = useState('');


    const { alldata, loading } = useFetchData('/api/shops');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const allblog = alldata.length;

    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()));

    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;

    const currnetBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog);

    const publishedblogs = currnetBlogs.filter(ab => ab.status === 'draft');

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }
    return <>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Draft <span>Products</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <TbBrandBlogger /> <span>/</span> <span>Shops</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Products</h2>
                    <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..." />
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <tr>
                                <td>
                                    <Dataloading />
                                </td>
                            </tr>
                        </> : <>
                            {publishedblogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>No Shops Found</td>
                                </tr>
                            ) : (
                                publishedblogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><img src={blog.images[0]} width={180} alt="image" /></td>
                                        <td><h3>{blog.title}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={'/shops/edit/' + blog._id}><button><FaEdit /></button></Link>
                                                <Link href={'/shops/delete/' + blog._id}><button><RiDeleteBin6Fill /></button></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </>}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}