export default function StructureRoute({ params }: { params: { id: string } }) {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Which of these best describe your Home?
                </h2>
            </div>
        </>
    );
}