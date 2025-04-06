import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {
    try {
        await mongooseConnect();
        const { method } = req;

        if (method === 'GET') {
            const projects = await Project.find();
            res.json(projects);
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}