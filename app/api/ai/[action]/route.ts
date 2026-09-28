import {runAI} from "@/lib/ai/provider";
import {z} from "zod";
const actionSchema=z.enum(["summarize","rewrite","translate","analyze"]);
const requestSchema=z.object({text:z.string().trim().min(1,"Enter some text to continue.").max(40_000,"Text is too long. Use 40,000 characters or fewer."),options:z.object({tone:z.string().max(30).optional(),language:z.string().max(50).optional()}).optional().default({})});
export async function POST(request:Request,{params}:{params:Promise<{action:string}>}){
 const {action}=await params;const parsedAction=actionSchema.safeParse(action);if(!parsedAction.success)return Response.json({error:"This AI tool is not available."},{status:404});
 let data:unknown;try{data=await request.json()}catch{return Response.json({error:"Enter valid request data."},{status:400})}
 const parsed=requestSchema.safeParse(data);if(!parsed.success){const issue=parsed.error.issues[0];return Response.json({error:issue?.message||"Enter valid request data."},{status:issue?.code==="too_big"?413:400})}
 try{return Response.json({result:await runAI(parsedAction.data,parsed.data.text,parsed.data.options)})}
 catch(error){const message=error instanceof Error?error.message:"Request failed.";const status=message.includes("not configured")?503:502;return Response.json({error:message},{status})}
}
