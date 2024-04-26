

export default function checkoutSuccess ({ params }: { params: { pid: string } }) {
    return (
        <div className="mt-48">
            <p>Hello <span>{params.pid}</span></p>
        </div>
    );
}