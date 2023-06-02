import FormFileUpload from "@/components/Form/FormFileUpload";

export default function Home() {
    return (
        <main className={'h-screen'}>
            <FormFileUpload accept={'.xml'}/>
        </main>
    )
}
