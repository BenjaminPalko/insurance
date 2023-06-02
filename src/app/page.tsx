import FormFileUpload from "@/components/Form/FormFileUpload";

export default function Home() {
    return (
        <main className={''}>
            <FormFileUpload accept={'.xml'}/>
        </main>
    )
}
