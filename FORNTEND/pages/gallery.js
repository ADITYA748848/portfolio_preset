import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";

import Head from "next/head";
import Link from "next/link";


export default function gallery() {
    const {alldata,loading}= useFetchData('/api/photos')
    return <>
        <Head>
            <title>Vbm coder: Gallery Photos</title>
        </Head>
        <div className="gallerypage">
            <div className="container">
                <div className="gallerytopsec">
                    <div className="topphonesec">
                        <div className="lefttitlesec">
                            <h4>ADITYACODER GALLERY PHOTOS</h4>
                            <h1>Aditya <br/> photographes</h1>
                            <Link href ='/gallery#galleryimages'><button>VIEW MORE</button></Link>
                        </div>
                        <div className="rightimgsec">
                            <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/6/1.jpg" alt=""/>
                            <div className="r_img_top">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fda%2F00%2F77%2Fda00778a953d4ae89fcada7f977121f6.jpg&f=1&nofb=1&ipt=37261c5aeac3718141168a12d48ff2035c954d2baf75801e733ebd0c74fa6793&ipo=images" alt=""/>
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F23%2F8f%2F34%2F238f34438bb5bef44315de6a26063dea.jpg&f=1&nofb=1&ipt=091969dee08c205db2a934bb6fd6699f5a1bb67556c2c434f612864d4842cf5d&ipo=images" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" gallerybtmphotos" id="galleryimages">
                <div className="container">
                    <div className="gbtmtitles text-center">
                        <h3><span>01//</span>OUR PORTFOLIO</h3>
                        <h2>Adityacoder capture<span> All of your</span><br/>beautiful memories</h2>
                    </div>
                    <div className="gallery_image_grid">
                        {loading ? <Spinner/> :<>
                            {alldata.map((photo)=>{
                                return <div className="image-item">
                                    <img src={photo.images[0]} alt="" />
                                    <div className="galeryimgiteminfo">
                                        <h2>{photo.title}</h2>
                                        <p>by Aditya coder</p>


                                    </div>

                                    
                                </div>    
                             
                            })}
                        </>}   
                     
                    </div>
                </div>
            </div>
            
        </div>
      
    </>
}