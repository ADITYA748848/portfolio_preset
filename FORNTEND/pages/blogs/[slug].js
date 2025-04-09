
import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";


const BlogPage = () => {
    const router = useRouter();

    const { slug } = router.query; // fetch the slug parameter from the router

    // hook for all data fetching

    const { alldata } = useFetchData("/api/blogs");

    const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
    const [newComment, setNewComment] = useState({
        name: "",
        email: "",
        title: "",
        contentpera: "",
        maincomment: true,
        parent: null,
        parentName: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messageok, setMessageOk] = useState("");
    const [copied, setCopied] = useState(false);



    useEffect(() => {
        const fetchBlogData = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`/api/blogs/${slug}`);
                    setBlogData(response.data);
                    setLoading(false);
                } catch (error) {
                    setError("Failed to fetch blog data. please try again later.");
                    setLoading(false);
                }
            }
        };

        fetchBlogData();
    }, [slug]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/blogs/${slug}`, newComment);

            if (newComment.parent) {
                setBlogData(prevData => {
                    const updatedComments = prevData.comments.map(Comment => {
                        if (comment._id === newComment.parent) {
                            return {
                                ...comment,
                                children: [...comment.children, response.data]
                            }
                        } else if (comment.children && comment.children.length > 0) {
                            return {
                                ...comment,
                                children: updateChildrenComments(comment.children, newComment.parent, response.data)
                            };
                        }
                        return comment;
                    });

                    return {
                        ...prevData,
                        comments: updatedComments
                    }
                })
            } else {
                setBlogData(prevData => ({
                    ...prevData,
                    comments: [response.data, ...prevData.comments]
                }))
            }

            setMessageOk('✅ Comment Posted Successfully');
            setTimeout(() => {
                setMessageOk('')
            }, 5000);

            setNewComment({
                name: '',
                email: '',
                title: '',
                contentpera: '',
                maincomment: true,
                parent: null,
                parentName: '',
            })
        } catch (error) {
            setMessageOk('❌ Failed to post comment');
            setTimeout(() => {
                setMessageOk('')
            }, 5000);
        }
    }
    const replyFormRef = useRef(null);

    const handleReply = (parentCommentId, parentName) => {
        setNewComment({
            ...newComment,
            parent: parentCommentId,
            parentName: parentName,
            maincomment: false
        })
        if (replyFormRef.current) {
            replyFormRef.current.scrollInfoView({ behavior: 'smooth' })
        }
    }

    const handleRemoveReply = () => {
        setNewComment({
            ...newComment,
            parent: null,
            parentName: null,
            maincomment: true
        })
    }

    const updateChildrenComments = () => {
        return comments.map(comment => {
            if (comment._id === parentId) {
                
            } else if (comment.children && comment.children.length > 0){
                return {
                    ...comment,
                    children: updateChildrenComments (comment.children, parentId, newComment)
                }
            }
            return comment;
        })
    }
    if (loading) {
        return (
            <div className="flex flex-center wh_100">
                <Spinner />
            </div>
        );
    }
    if (error) {
        return <p>Error:{error}</p>;
    }
    const createdAtDate =
        blogData && blogData.blog.createdAt
            ? new Date(blogData && blogData.blog.createdAt)
            : null;

    const formatDate = (date) => {
        if (!date || isNaN(date)) {
            return "";
        }

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour12: true,
        };

        return new Intl.DateTimeFormat("en-US", options).format(date);
    }
    const blogurl = `http://localhost:3000/blogs/${slug}`;


    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);

        }, 3000); // reset copied state after 3 seconds
    }
    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const [copied, setCopied] = useState(false);
        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);

            }, 3000);

        }
        if (inline) {
            return <code>{children}</code>

        } else if (match) {
            return (
                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}  // Use the correct style name
                        language={match[1]}
                        PreTag='pre'
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' } }}


                    >
                        {String(children).replace(/\n$/, '')}


                    </SyntaxHighlighter>
                    <button onclick={handleCopy} style={{ position: 'absolute', top: '0', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }}>
                        {copied ? 'Copied!' : 'Copy code'}

                    </button>

                </div >

            );
        } else {
            return (
                <code className="md-post-code"{...props}>
                    {children}
                </code>
            )
        }
    }

    const renderComments = (comments) => {
        if (!comments) {
            return null;
        }

        const commentsMap = new Map();
        comments.forEach(comment => {
            if (comment.maincomment) {
                commentsMap.set( comment._id, [])
            } 
        })

        comments.forEach(comment => {
            if (!comment.maincomment && comment.parent) {
                if (commentsMap.has(comment.parent)) {
                    commentsMap.get(comment.parent).push(comment);
                }  
            } 
        });
    }

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div>
                {blogData && (
                    <div className="blogslugpage">
                        <div className="container">
                            <div className="blogslugpagecont">
                                <div className="leftsitedetails">

                                    <div className="leftbloginfoimg">
                                        <img src={blogData.blog.images[0] || '/img/noimage.png'} alt={blogData && blogData.title} />
                                    </div>
                                    <div className="slugbloginfopub">
                                        <div className="flex gap-2">
                                            <div className="adminslug">
                                                <img
                                                    src={blogData.blog.images[0] || "/img/noimage.png"}
                                                    alt=""
                                                />

                                                <span>By AdityaCoder</span>
                                            </div>
                                            <div className="adminslug">
                                                <SlCalender />
                                                <span>{formatDate(createdAtDate)}</span>
                                            </div>
                                            <div className="adminslug">
                                                <CiRead />
                                                <span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
                                            </div>
                                        </div>

                                        <div className="shareblogslug">
                                            {/* copy url button */}
                                            <div title="Copy URL" onClick={() => handleCopyUrl(blogurl)} style={{ cursor: 'pointer' }}>
                                                <BsCopy /> <span>{copied ? 'Copied!' : ''}</span>
                                            </div>

                                            {/* facebook share buttton */}
                                            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                                <RiFacebookFill />

                                            </a>
                                            {/* twitter share button */}
                                            <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this blog post:' + blogurl)}`} rel="noopener noreferrer">
                                                <FaTwitter />

                                            </a>
                                            {/* whatsapp share button */}
                                            <a target="_blank" href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                                <RiWhatsappFill />

                                            </a>
                                            {/* linkedin share button */}
                                            <a target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogurl)}`} rel="noopener noreferrer">
                                                <BiLogoLinkedin />

                                            </a>

                                        </div>
                                    </div>
                                    <h1>{blogData.blog.title}</h1>
                                    {loading ? <Spinner /> : <div className="blogcontent">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                code: Code,

                                            }}
                                        >
                                            {blogData.blog.description}


                                        </ReactMarkdown>

                                    </div>}
                                    <div className="blogslugtags">
                                        <div className="blogstegs">
                                            <h2>Tags:</h2>
                                            <div className="flex flex-wrap gap-1">
                                                {blogData && blogData.blog.tags.map((cat) => {
                                                    return <span key={cat}>{cat}</span>
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="blogusecomments">
                                        <h2>Comment</h2>
                                        { }
                                    </div>
                                    <div className="blogslugcomments">
                                        { }

                                        { }
                                    </div>
                                    <p>Your email address will not be publish. Required fileds are marked *</p>
                                    <form className="leaveareplyform" onSubmit={handleCommentSubmit}>
                                        <div className="nameemailcomment">
                                            <input 
                                            type="text" 
                                            placeholder="Enter Name" 
                                            value={newComment.name}
                                            onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                                            />
                                            <input 
                                            type="email" 
                                            placeholder="Enter Email" 
                                            value={newComment.email}
                                            onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                                            />
                                        </div>
                                        <input 
                                        type="text" 
                                        placeholder="Enter Title" 
                                        value={newComment.title}
                                        onChange={(e) => setNewComment({...newComment, title: e.target.value})}
                                        />
                                        <textarea 
                                        name="" 
                                        rows={4} 
                                        placeholder="Enter Your Comments" 
                                        id="textcomments"
                                        value={newComment.contentpera}
                                        onChange={(e) => setNewComment({...newComment, contentpera: e.target.value})}
                                        ></textarea>
                                        <div className="flex gap-2">
                                            <button type="submit">Post Comment</button>
                                            <p>{messageok}</p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
};

export default BlogPage;
