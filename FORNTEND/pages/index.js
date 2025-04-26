import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import { FaCalendarDays, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";

export default function Home() {

  // active service background color
  const [activeIndex, setActiveIndex] = useState(0);
  const handleHover = (index) => {
    setActiveIndex(index)
  }
  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as
  }



  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];
  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const [projectResponse, blogResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ])

        const projecData = await projectResponse.json();
        const blogsData = await blogResponse.json();
        setAlldata(projecData);
        setAllwork(blogsData);

      } catch (error) {
        console.error('Error fetching Data ', error)

      } finally {
        setLoading(false);
      }
    }
    fetchdata();

  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory))
    }
  }, [selectedCategory, alldata])

  const handleCategoryChange = (category) => {
    selectedCategory(category);
  }

  const formateDate = (date) => {
    if (!date || isNaN(date)) {
      return '';
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true
    };

    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const textArray = ["Web Developer", "DevOps ", "Full Stack Dev"];
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false); // new state to handle pause
  const typingSpeed = 80;
  const deletingSpeed = 50;
  const delayBetweenTexts = 1000;
  
  useEffect(() => {
    const currentText = textArray[textIndex];
  
    if (pause) {
      const pauseTimeout = setTimeout(() => {
        setPause(false);
        setIsDeleting(true); // start deleting after pause
      }, delayBetweenTexts);
      return () => clearTimeout(pauseTimeout);
    }
  
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
  
        if (charIndex + 1 === currentText.length) {
          setPause(true); // pause once full text is typed
        }
      } else {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
  
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
  
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, pause]);
  




  return (
    <>
      <Head>
        <title>AdityaRaj - Personal Portfolio</title>
        <meta name="description" content="adityaraj - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" crossOrigin="anonymous" />
        {/* <link rel="shortcut icon" type="image/png" href="/favicon.png" /> */}
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x='50%' y='50%' textAnchor='middle' className="animate-stroke">HI</text>
          </svg>

        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right">I am Aditya</span>
              <h1
                className="hero_title aos-init aos-animate"
                data-aos="fade-right"
              >
                App Developer + <br />
                <span className="typed-text text-blue-600">{text}</span>
                <span className="typed-cursor text-blue-600">|</span>
              </h1>
              <div className="hero_img_box heroimgbox" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <img src="/img/me.jpg" alt="coder" />

              </div>
              <div className=" lead" data-aos="fade-up"> I break down complex user experience problems to create integritiy focussed solution that connect billions of people .</div>
              <div className=" hero_btn_box" data-aos="fade-up">
                <Link href='/' download={'/img/resume.pdf'} className='download_cv'>Download CV <BiDownload /></Link>
                <ul className="hero_social">
                  <li> < a href="/"><FaTwitter /></a></li>
                  <li> < a href="/"><LiaBasketballBallSolid /></a></li>
                  <li> < a href="/"><GrLinkedinOption /></a></li>
                  <li> < a href="https://github.com/ADITYA748848"><FaGithub /></a></li>

                </ul>
              </div>
            </div>
            {/* rightside image section */}
            <div className="heroimageright">
              <div className="hero_img_box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <img src="/img/me.png" alt="" />
              </div>

            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>3+</h3>
              <h4>year of<br />
                Experience </h4>

            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3> 20+ </h3>
              <h4> projects <br />
                completed</h4>

            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>6+</h3>
              <h4> OpenSource <br />
                Library </h4>

            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>4+</h3>
              <h4>Happy <br />
                Customers</h4>

            </div>

          </div>

        </div>

      </section>

      {/* Services */}
      <section className="services">
        <div className="services" data-aos="fade-up">
          <div className="container">
            <div className="services_titles">
              <h2>MY Quality services</h2>
              <p> We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers . </p>
            </div>
            <div className="services_menu">
              {services.map((service, index) => (
                <div key={index}
                  className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                  onMouseOver={() => handleHover(index)}
                  onMouseOut={handleMouseOut}


                >
                  <div className="left_s_box">
                    <span>0 {index + 1}</span>
                    <h3>{service.title}</h3>


                  </div>
                  <div className="right_s_box">
                    <p>{service.description}</p>

                  </div>
                  <GoArrowUpRight />


                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container" >
          <div className="project_titles">
            <h2> My Recent Works </h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers .</p>
          </div>
          <div className="project_buttons">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'Design System' ? 'active' : ''} onClick={() => setSelectedCategory('Design System')}>Design</button>
            <button className={selectedCategory === 'Video Editing' ? 'active' : ''} onClick={() => setSelectedCategory('Video Editing')}>Editing</button>
          </div>

          <div className="projects_cards" >
            {loading ? <div className="flex flex-center wh_100"  ><Spinner /></div> : (
              filteredProjects.length === 0 ? (

                <h1 className="w-100 flex flex-center mt-3" >No Project Found</h1>
              ) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href='/' key={pro._id} className="procard" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                    <div className="proimgbox" >
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}

          </div>
        </div>



      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience" data-aos="flip-right">
            <div className="experience_title flxe gap-1">
              <LuMedal />
              <h2>My Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2023-Present</span>
                <h3>Freelance</h3>
                <p>Full Stack App Developer</p>
              </div>
              <div className="exper_card">
                <span>2023-Present</span>
                <h3>Freelance</h3>
                <p>Full Stack Web Developer</p>
              </div>
              <div className="exper_card">
                <span>2024-Present</span>
                <h3>Freelance</h3>
                <p>Marketing</p>
              </div>
              <div className="exper_card">
                <span>2025-Present</span>
                <h3>Developing Phase</h3>
                <p>AI developer</p>
              </div>
            </div>
          </div>
          <div className="experience" data-aos="flip-left">
            <div className="experience_title flxe gap-1">
              <PiGraduationCap />
              <h2>My Education</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2020-2022</span>
                <h3>Higher Secondary Education</h3>
                <p>S.G.D.M College Memorial ,Patna</p>
              </div>
              <div className="exper_card">
                <span>2022-2023</span>
                <h3>IIT Preparation</h3>
                <p>Physics Wallah (PW),  Patna</p>
              </div>
              <div className="exper_card">
                <span>2023-2027</span>
                <h3>B.Tech</h3>
                <p>Galgotias University</p>
              </div>
              <div className="exper_card">
                <span>2025-Present</span>
                <h3>Learning Phases(CSE)</h3>
                <p>Self Study</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2>My Skills</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers </p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-right">
                <img src="/img/python.svg" alt="python" />
                <h2>85%</h2>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-right">
                <img src="/img/cpp.png" alt="firebase" />
                <h2>95%</h2>
              </div>
              <p className="text-center">CPP</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-right">
                <img src="/img/5.svg" alt="mongodb" />
                <h2>92%</h2>
              </div>
              <p className="text-center">Java</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/js.svg" alt="redux"  />
                <h2>98%</h2>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/react.svg" alt="react" />
                <h2>93%</h2>
              </div>
              <p className="text-center">React</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/next.svg" alt="react" />
                <h2>90%</h2>
              </div>
              <p className="text-center">Next-js</p>
            </div>
            
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/mongodb.svg" alt="react" />
                <h2>90%</h2>
              </div>
              <p className="text-center">MongoDB</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/8.svg" alt="react" />
                <h2>90%</h2>
              </div>
              <p className="text-center">Tailwind</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/4.svg " alt="react" />
                <h2>98%</h2>
              </div>
              <p className="text-center">Github</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/3.svg " alt="react" />
                <h2>90%</h2>
              </div>
              <p className="text-center">Android Studio</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/firebase.svg " alt="react" />
                <h2>85%</h2>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner" data-aos="fade-left">
                <img src="/img/redux.svg" alt="js" />
                <h2>65%</h2>
              </div>
              <p className="text-center">Redux</p>
            </div>
          </div>
        </div>

      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container" data-aos="fade-up">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'}
                    alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formateDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}