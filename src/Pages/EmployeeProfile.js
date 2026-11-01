import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "../components/Loader/Loader";

export const EmployeeProfile = () => {
    const [employeeprofile, setEmployeeProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    useEffect(() => {
        const controller = new AbortController();

        async function fetchEmployeeProfile() {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                if (controller.signal.aborted) {
                    return;
                }

                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const data = await response.json();
                setEmployeeProfile(data);
            } catch (requestError) {
                if (!controller.signal.aborted) {
                    setError('Unable to load employees. Please try again later.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        fetchEmployeeProfile();

        return () => controller.abort();
    }, [id]);
    return (


        <main className="employee-detail-page">
            {isLoading && <Loader />}
            {!isLoading && !error && (
                <>
                    <header className="employee-page-header">

                        <p className="employee-page-eyebrow">EMPLOYEE DIRECTORY</p>
                        <h1>Employee Profile</h1>
                        <p className="employee-page-subtitle">
                            Get to know the people behind the work.
                        </p>
                    </header>

                    <section className="employee-profile-layout" aria-label="Employee details">
                        <div className="employee-avatar-panel">
                            <div className="employee-avatar" role="img" aria-label="Avatar of Leanne Graham">
                                <img alt={employeeprofile.name} src={`https://api.dicebear.com/10.x/initials/svg?seed=${employeeprofile.name}`} />

                            </div>

                        </div>

                        <div className="employee-profile-details">
                            <div className="employee-name-block">
                                <p className="employee-section-label">EMPLOYEE</p>
                                <h2>{employeeprofile.name}</h2>
                                <p className="employee-username">@{employeeprofile.username}</p>
                            </div>

                            <div className="employee-info-grid">
                                <div className="employee-info-item">
                                    <span className="employee-info-label">Email</span>
                                    <span className="employee-info-value"> <a href={`mailto:${employeeprofile.email}`}>{employeeprofile.email}</a></span>
                                </div>
                                <div className="employee-info-item">
                                    <span className="employee-info-label">Phone</span>
                                    <span className="employee-info-value">{employeeprofile.phone}</span>
                                </div>
                                <div className="employee-info-item">
                                    <span className="employee-info-label">Website</span>
                                    <a className="employee-info-value employee-website" rel="noreferrer" target="_blank" href={`https://${employeeprofile.website}`}>
                                        {employeeprofile.website}
                                    </a>
                                </div>
                                <div className="employee-info-item">
                                    <span className="employee-info-label">Address</span>
                                    <span className="employee-info-value">
                                        {employeeprofile.address.street},  {employeeprofile.address.suite}<br />
                                        {employeeprofile.address.city},  {employeeprofile.address.zipcode}
                                    </span>
                                </div>
                            </div>

                            <div className="employee-company">
                                <p className="employee-section-label">COMPANY</p>
                                <h3> {employeeprofile.company.name}</h3>
                                <p> {employeeprofile.company.catchPhrase}</p>
                                <span> {employeeprofile.company.bs}</span>
                            </div>
                        </div>
                    </section>
                    <Link className="employee-back-link" to="/">
                        &larr; Back to directory
                    </Link>
                </>
            )
            }
        </main>




    )
}