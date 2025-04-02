import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";
import projects from "../projects";
import projects from "../projects";

export default async function handle(req, res) {
    // if authernticated , connect to mongoose
    await mongooseConnect();
    const {method} = req;
    if (method === 'GET'){
        if (req.query?.id){
            // fetch a single project by id
            const project = await projects.findById(req.query.id);
            res.josn(project);

        }else if (req,query?.projectCategory){
            // /fetch project by category\
            const projectcate = await projects.find({ projectcategory: req.query.projectCategory})
            res.josn(projectcate);
    
        }else if (req.query?.slug){
            // fetch peroject by slug
            const projectslug = await Project.find({ slug:req.query.slug});
            res.josn(projectslug.reverse()) ;
            
        }else {
            // fetch all projects
            const projects = await projects.find();
            res.json( projects.reverse());
        }

        
    }else{
        res.staus(405).json({message: 'Method Not Allowes'});

    }

}