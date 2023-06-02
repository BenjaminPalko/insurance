import FormFileUpload from "@/components/Form/FormFileUpload";

export default function Submission() {
    return (
        <main className={''}>
            <FormFileUpload accept={'.xml'}/>
        </main>
    )
}
