function Promote() {
    const[employee, setEmployee] = useState("John Doe", "Jane Smith", "Michael Johnson", "Emily Davis", "David Wilson")
    return (
        <>
            <h1>
                Employee program is going to start from next month. Please be ready with your resume and certificates.
            </h1>
            <table>
                <thead>
                    <th>Employee Name</th>
                    <th>Promotion Status</th>
                </thead>
            </table>
        </>
            
       );
}

export default Promote;