import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Auth.css";
import styles from "../../styles/Card.module.css";
import { Button, Modal, Form, FormControl, Spinner, Alert, Card, Collapse, InputGroup, FormGroup } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getListChilds, submitDailyReport, submitGoal, submitObservations, submitCriticalReflection, submitHistoricalReport, submitWeeklyPlanning, submitWeeklyReflection, submitGetVariablesReports, submitFollowUp, fetchLastDocumentData, addNewChild } from '../../api'; // Import the submitDailyReport function
import CardGrid from "../CardGrid";
import ChildForm from "../childcomponents/ChildForm";
const ListReports = () => {

    // const gnrl
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [date, setDate] = useState(new Date());
    const handleConfirm = (date) => {
        setDate(date);
    };

    // const report view
    const navigate = useNavigate();
    // const spinner Previous variables 
    const [submittingPreviousVariables, setSubmittingPreviousVariables] = useState(false);

    // const daily report
    const [show, setShow] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activities, setActivities] = useState("");
    const [rangeAgeDailyReport, setRangeAgeDailyReport] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = async () => setShow(true);

    const handlePreviousVariablesDailyReport = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "daily_report");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            setActivities(lastVariable.get_variables.variables.activities)
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");

        }
    }


    // const to goal
    const [showGoal, setShowGoal] = useState(false);
    const [goals, setGoals] = useState('');
    const handleCloseGoal = () => setShowGoal(false);
    const handleShowGoal = () => setShowGoal(true);

    const handlePreviousGoal = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "goal_report");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            // setName(lastVariable.get_variables.variables.name);
            // setAge(lastVariable.get_variables.variables.age);
            setGoals(lastVariable.get_variables.variables.goals);
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");
        }
    }
    // const to Observations
    const [showObservations, setShowObservations] = useState(false);
    const [goalObservations, setGoalObservations] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const handleCloseObservations = () => setShowObservations(false);
    const handleShowObservations = () => setShowObservations(true);

    const handlePreviousObservations = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "descriptions_report");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            // setName(lastVariable.get_variables.variables.name);
            // setAge(lastVariable.get_variables.variables.age);
            setDescriptions(lastVariable.get_variables.variables.descriptions);
            setGoalObservations(lastVariable.get_variables.variables.goal_observations)
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");
        }
    }

    // const Critical Reflection
    const [showFormReflection, setShowFormReflection] = useState(false);
    const [description, setDescription] = useState('');
    const handleCloseFormReflection = () => setShowFormReflection(false);
    const handleShowFormReflection = () => setShowFormReflection(true);

    const handlePreviousCriticalReflection = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "critical_reflection");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            setDescription(lastVariable.get_variables.variables.description);
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");
        }
    }
    // const Weekly Reflection
    const [showFormWeeklyReflection, setShowFormWeeklyReflection] = useState(false);
    const [description_reflection, setDescriptionReflection] = useState('');
    const handleCloseFormWeeklyReflection = () => setShowFormWeeklyReflection(false);
    const handleShowFormWeeklyReflection = () => setShowFormWeeklyReflection(true);

    const handlePreviousWeeklyReflection = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "weekly_reflection");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            if (lastVariable.get_variables.variables.descriptions) {
                setDescriptionReflection(lastVariable.get_variables.variables.descriptions);
            }
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");
        }
    }
    // const Weekly Planning
    const [showFormWeeklyPlanning, setShowFormWeeklyPlanning] = useState(false);
    const [descriptionPlanning, setDescriptionPlanning] = useState('');
    const [rangeAge, setRangeAgePlanning] = useState('');
    const handleCloseFormWeeklyPlanning = () => setShowFormWeeklyPlanning(false);
    const handleShowFormWeeklyPlanning = () => setShowFormWeeklyPlanning(true);

    const handlePreviousWeeklyPlanning = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "weeklyn_planning");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            if (lastVariable.get_variables.variables.range_age) {
                setDescriptionReflection(lastVariable.get_variables.variables.range_age);
            }
            setDescriptionPlanning(lastVariable.get_variables.variables.goals)
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");
        }
    }
    // const to follow up
    const [showFollowUp, setShowFollowUp] = useState(false);
    const [goalFollowUp, setGoalFollowUp] = useState('');
    const [descriptionsFollowUp, setDescriptionsFollowUp] = useState('');
    const handleCloseFollowUp = () => setShowFollowUp(false);
    const handleShowFollowUp = () => setShowFollowUp(true);

    const handlePreviousFollowUp = async () => {
        setSubmittingPreviousVariables(true);

        const token = localStorage.getItem('token');
        const lastVariable = await fetchLastDocumentData(token, "follow_up");
        const variables = lastVariable?.get_variables?.variables;
        if (variables) {
            setSubmittingPreviousVariables(false);
            setGoalFollowUp(lastVariable.get_variables.variables.goals);
            setDescriptionsFollowUp(lastVariable.get_variables.variables.descriptions)
        } else {
            setSubmittingPreviousVariables(false);
            showAlert("not variables found.");
        }

    }


    // const handleRedirect = (title, content, name,childId, age, goalObservations) => {
    //     navigate("/report", { state: { title, content, name,childId, age, goalObservations } });
    // };

    const handleRedirect = (reportData) => {
        navigate("/report", { state: { reportData } });
    }
    // add child
    const [isOpen, setIsOpen] = useState(false);
    const [childName, setChildName] = useState('');
    const [childAge, setChildAge] = useState('');
    const [childCare, setChildCare] = useState('');
    const [isSubmittingChild, setIsSubmittingChild] = useState(false);


    const handleSubmitChild = async (e) => {
        e.preventDefault();
        setIsSubmittingChild(true);
        const token = localStorage.getItem('token');
        const response = await addNewChild(token, childName, childAge, childCare);
        if (response.error) {
            setIsSubmittingChild(false);
            showAlert("Error adding child.", "danger");
        } else {
            setIsSubmittingChild(false);
            showAlert("Child added successfully, you can select the child.", "success");
            const data = await getListChilds(token);
            setChilds(data.data);


        }

        setIsSubmittingChild(false);
    }

    //  const to alert
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("info");


    const showAlert = (message, type = "info") => {
        setAlertMessage(message);
        setAlertType(type); // Set the alert type
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 5000);
    };


    const handleCleanForm = (form) => {
        switch (form) {
            case 'descriptions_report':
                setDescriptions('');
                setGoalObservations('')
                break;
            case 'daily_report':
                setActivities('')
                break;
            case 'goal_report':
                setGoals('');
                break;
            case 'critical_reflection':
                setDescription('');
                break;
            case 'weekly_reflection':
                setDescriptionReflection('');

                break;
            case 'weeklyn_planning':
                setDescriptionReflection('');
                setDescriptionPlanning('');
                break;
            case 'follow_up':
                setGoalFollowUp('');
                setDescriptionsFollowUp('');
                break;
            default:
                console.log('Formulario no reconocido:', form);

        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem('token'); // Obtener el token del local storage
            const data = await submitDailyReport(token, rangeAgeDailyReport, date, activities);
            if (data.error) {
                showAlert(data.error, "danger");
            } else {

                setSubmitting(false);
                handleClose();
                const reportData = {
                    title: 'Daily Report',
                    content: data['message'],
                    activities,
                    rangeAgeDailyReport,

                };
                handleRedirect(reportData);
                // handleRedirect('Daily Report', data['message']);
            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }

    };

    const handleSubmitGoal = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token'); // Obtener el token del local storage
            const data = await submitGoal(token, date, name, age, goals); // Use the imported function
            // const data = await response.json();

            setSubmitting(false);
            handleClose();
            const childId = selectedChild._id;
            const reportData = {
                title: 'Goal Report',
                content: data['message'],
                name,
                childId,
                age,
                goals,
            };
            handleRedirect(reportData);
            // handleRedirect('Goal Report', data['message'], name, childId, age);


        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);

        }

    };

    const handleSubmitObservations = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token'); // Obtener el token del local storage
            const data = await submitObservations(token, date, name, age, goalObservations, descriptions); // Use the imported function
            // const data = await response.json();

            // Simulación de una petición que tarda 2 segundos en completarse
            if (data.error) {
                showAlert(data.error);
            } else {
                // setFormData({ date, name, age, goalObservations, descriptions });
                setSubmitting(false);
                handleClose();
                const childId = selectedChild._id;
                const reportData = {
                    title: 'Descriptions Report',
                    content: data['message'],
                    name,
                    childId,
                    age,
                    goalObservations,

                };
                handleRedirect(reportData);
                // handleRedirect('Descriptions Report', data['message'], name, childId, age, goalObservations);
            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }
    };
    const handleSubmitCriticalReflection = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = localStorage.getItem('token'); // Obtener el token del local storage
            const data = await submitCriticalReflection(token, date, description);

            if (data.error) {
                showAlert(data.error);
            } else {
                setSubmitting(false);
                handleClose();
                const reportData = {
                    title: 'Critical Reflection',
                    content: data['message'],
                    description
                };
                handleRedirect(reportData);
                // handleRedirect('Critical Reflection', data['message']);
            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }

    };

    const handleHistoricalReportSubmission = async (typeReport) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const data = await submitHistoricalReport(token, typeReport);

            // Filtrar los reportes con el mismo 'typeReport'
            const filteredReports = data.list_report.filter(report => report.type_report === typeReport);

            // Redirigir a la vista de reportes y pasar la data como estado de ubicación
            navigate('/report-list', { state: { reports: filteredReports } });

        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }
    };

    const handleSelectReportReflectionSubmission = async (typeReport) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const data = await submitGetVariablesReports(token, typeReport);

            // Filtrar los reportes con el mismo 'typeReport'
            const filteredReports = data.get_report.filter(report => report.type_report === typeReport);

            // Redirigir a la vista de reportes y pasar la data como estado de ubicación
            navigate('/select_report_reflection', { state: { reports: filteredReports } });
        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }
    };
    const handleSubmitWeeklyReflection = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const data = await submitWeeklyReflection(token, date, description_reflection);
            setSubmitting(false);
            handleClose();

            if (data.error) {
                showAlert("Error");
            } else {
                setSubmitting(false);
                handleClose();
                const reportData = {
                    title: 'Weekly Reflection',
                    content: data['message'],
                    description_reflection
                };
                handleRedirect(reportData);
            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }

    }
    const handleSubmitWeeklyPlanning = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const data = await submitWeeklyPlanning(token, date, rangeAge, descriptionPlanning);

            if (data.error) {
                showAlert(data.error);
            } else {
                setSubmitting(false);
                handleClose();
                const reportData = {
                    title: 'Weekly Planning',
                    content: data['message'],
                    rangeAge,
                    descriptionPlanning
                };
                handleRedirect(reportData);
            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to send. Please try again later.", "danger");
            setSubmitting(false);
        }

    }

    const handleSubmitFollowUp = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token'); // Obtener el token del local storage
            const data = await submitFollowUp(token, date, name, age, goalFollowUp, descriptionsFollowUp); // Use the imported function
            // const data = await response.json();

            // Simulación de una petición que tarda 2 segundos en completarse
            if (data.error) {
                showAlert(data.error);
            } else {
                setSubmitting(false);
                handleClose();
                const childId = selectedChild._id;
                const reportData = {
                    title: 'Follow up',
                    content: data['message'],
                    name,
                    childId,
                    age,
                    goalFollowUp,
                    descriptionsFollowUp,
                };
                handleRedirect(reportData);
                // handleRedirect('Follow up', data['message'], name, childId, age, goalFollowUp);


            }
        } catch (error) {
            console.error(error);
            showAlert("Failed to send report. Please try again later.", "danger");
            setSubmitting(false);
        }

    }

    const [childs, setChilds] = useState([]);
    const [selectedChild, setSelectedChild] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchChilds = async () => {
            const data = await getListChilds(token);
            setChilds(data.data);
        };

        fetchChilds();
    }, []);

    return (
        <div >
            <Modal show={showObservations} onHide={handleCloseObservations}>

                <Modal.Header closeButton>
                    <Modal.Title>Report Observations</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <ChildForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isSubmittingChild={isSubmittingChild}
                        handleSubmitChild={handleSubmitChild}
                        childName={childName}
                        setChildName={setChildName}
                        childAge={childAge}
                        setChildAge={setChildAge}
                        childCare={childCare}
                        setChildCare={setChildCare}
                    />
                    <Form onSubmit={handleSubmitObservations} >
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedChild ? selectedChild._id : ""}
                                onChange={(e) => {
                                    const selected = childs.find(child => child._id === e.target.value);
                                    if (selected) {
                                        setSelectedChild(selected);
                                        setName(selected.child_name);
                                        setAge(selected.age);
                                    } else {
                                        console.log("No child found with id: ", e.target.value);
                                    }
                                }}
                                required
                            >

                                {/* <option value="" disabled={selectedChild !== ""}>Select child</option>
                            {childs.map((child) => (
                                <option key={child._id} value={child._id}>
                                {child.child_name}
                                </option>
                            ))} */}
                                <option value="" disabled={selectedChild !== ""}>Select child</option>
                                {childs.length > 0 ? (
                                    childs.map((child) => (
                                        <option key={child._id} value={child._id}>
                                            {child.child_name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No children available, please add a child.</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="link" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Add Child'}</Button>



                        <br />
                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={age}
                                placeholder="Example: 1,7"
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="goals">
                            <Form.Label>Goals</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={5}
                                placeholder="Example: To assist Jasper in developing his fine motor skills"
                                value={goalObservations}
                                onChange={(e) => setGoalObservations(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="goals">
                            <Form.Label>Descriptions</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={5}
                                placeholder="Example: Jasper was drawn to the paper-cutting-with-scissors activity. He sat in the chair and very attentively waited for the teacher's instructions to start developing the activity. bJasper enjoyed cutting the paper into small pieces. Jasper successfully completed the activity showing that his fine motor skills have greatly improved."
                                value={descriptions}
                                onChange={(e) => setDescriptions(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <br />
                        <Button variant="primary" type="submit" disabled={submitting} size="sm">
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousObservations} disabled={submittingPreviousVariables} size="sm" >
                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('descriptions_report')} size="sm" >
                            Clean
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Daily Report</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="rangeAgeDailyReport">
                            <Form.Label>Range age</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Example: 1-2"
                                value={rangeAgeDailyReport}
                                onChange={(e) => setRangeAgeDailyReport(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="activities">
                            <Form.Label>Activities</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="Example: Morning activity: playing in the outdoor area, Group time: they sang five little monkeys swinging in the tree to remain of numbers, they recognized the numbers 1 and 2 written in two balloons that were inflated, next activity: letter Aa by Through songs and examples , next activity: arts and crafts related to what they are learning. They did the letter a for apple, lecture time: where they learned about bugs. End of the day activity: playing with the parachute and sharing with his friends. Lunch: optional"
                                value={activities}
                                onChange={(e) => setActivities(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" disabled={submitting} size="sm">
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousVariablesDailyReport} disabled={submittingPreviousVariables} size="sm" >

                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('daily_report')} size="sm" >
                            Clean
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showGoal} onHide={handleCloseGoal}>
                <Modal.Header closeButton>
                    <Modal.Title>Report Goal</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <ChildForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isSubmittingChild={isSubmittingChild}
                        handleSubmitChild={handleSubmitChild}
                        childName={childName}
                        setChildName={setChildName}
                        childAge={childAge}
                        setChildAge={setChildAge}
                        childCare={childCare}
                        setChildCare={setChildCare}
                    />
                    <Form onSubmit={handleSubmitGoal}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>

                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedChild ? selectedChild._id : ""}
                                onChange={(e) => {
                                    const selected = childs.find(child => child._id === e.target.value);
                                    if (selected) {
                                        setSelectedChild(selected);
                                        setName(selected.child_name);
                                        setAge(selected.age);
                                    } else {
                                        console.log("No child found with id: ", e.target.value);
                                    }
                                }}
                                required
                            >
                                <option value="" disabled={selectedChild !== ""}>Select child</option>
                                {childs.map((child) => (
                                    <option key={child._id} value={child._id}>
                                        {child.child_name}
                                    </option>
                                ))}
                            </Form.Control>
                        <Button variant="link" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Add Child'}</Button>

                        </Form.Group>
                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="goals">
                            <Form.Label>Goals</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={8}
                                placeholder="Example: Improve verbal communication using her words to express feelings and her needs"
                                value={goals}
                                onChange={(e) => setGoals(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit" disabled={submitting} size="sm">
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousGoal} disabled={submittingPreviousVariables} size="sm">
                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('goal_report')} size="sm" >
                            Clean
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showFormReflection} onHide={handleCloseFormReflection}>
                <Modal.Header closeButton>
                    <Modal.Title>Critical Reflection</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <Form onSubmit={handleSubmitCriticalReflection}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="description">
                            <Form.Label>Describe daily reflection</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={description}
                                placeholder="Example: Children were engaged during the group time by choosing the letter they wanted to learn during the week. Children enjoyed singing five little monkeys swinging on the tree. Children enjoyed developing arts and crafts about letters and they remember easily what word start whit the letter, in this case P for piggy.Some parents are worried about their child emotional manage because they mention they do not know how to manage it, because the children do not have self-regulation. Many children need to improve their help-self skills"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>


                        <br />
                        <Button variant="primary" type="submit" disabled={submitting} size="sm">
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousCriticalReflection} disabled={submittingPreviousVariables} size="sm">
                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('critical_reflection')} size="sm" >
                            Clean
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showFormWeeklyReflection} onHide={handleCloseFormWeeklyReflection}>
                <Modal.Header closeButton>
                    <Modal.Title>Weekly Reflection</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <Form onSubmit={handleSubmitWeeklyReflection}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="description">
                            <Form.Label>Describe weekly reflection</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={description_reflection}
                                placeholder="Example: Children were engaged during the group time by choosing the letter they wanted to learn during the week. Children enjoyed singing five little monkeys swinging on the tree. Children enjoyed developing arts and crafts about letters and they remember easily what word start whit the letter, in this case P for piggy. Some parents are worried about their child emotional manage because they mention they do not know how to manage it, because the children do not have self-regulation. Many children need to improve their help-self skills"
                                onChange={(e) => setDescriptionReflection(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>


                        <br />
                        <Button variant="primary" type="submit" disabled={submitting} size="sm" >
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousWeeklyReflection} disabled={submittingPreviousVariables} size="sm" >
                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('weekly_reflection')} size="sm" >
                            Clean
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showFormWeeklyPlanning} onHide={handleCloseFormWeeklyPlanning}>
                <Modal.Header closeButton>
                    <Modal.Title>Weekly Planning</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <Form onSubmit={handleSubmitWeeklyPlanning}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group controlId="age">
                            <Form.Label>Range Age</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={rangeAge}
                                placeholder="Example: 1-2"
                                onChange={(e) => setRangeAgePlanning(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Goals</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                value={descriptionPlanning}
                                placeholder="Example: Carry out activities in the outdoor area that allow children to enjoy Easter time"
                                onChange={(e) => setDescriptionPlanning(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br></br>


                        <br />
                        <Button variant="primary" type="submit" disabled={submitting} size="sm">
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousWeeklyPlanning} disabled={submittingPreviousVariables} size="sm">
                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('weeklyn_planning')} size="sm" >
                            Clean
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showFollowUp} onHide={handleCloseFollowUp}>
                <Modal.Header closeButton>
                    <Modal.Title>Follow up</Modal.Title>
                </Modal.Header>
                {alertVisible && (
                    <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Modal.Body>
                    <ChildForm
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isSubmittingChild={isSubmittingChild}
                        handleSubmitChild={handleSubmitChild}
                        childName={childName}
                        setChildName={setChildName}
                        childAge={childAge}
                        setChildAge={setChildAge}
                        childCare={childCare}
                        setChildCare={setChildCare}
                    />
                    <Form onSubmit={handleSubmitFollowUp}>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className="form-control"
                                selected={date}
                                onChange={handleConfirm}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedChild ? selectedChild._id : ""}
                                onChange={(e) => {
                                    const selected = childs.find(child => child._id === e.target.value);
                                    if (selected) {
                                        setSelectedChild(selected);
                                        setName(selected.child_name);
                                        setAge(selected.age);
                                    } else {
                                        console.log("No child found with id: ", e.target.value);
                                    }
                                }}
                                required
                            >
                                <option value="" disabled={selectedChild !== ""}>Select child</option>
                                {childs.map((child) => (
                                    <option key={child._id} value={child._id}>
                                        {child.child_name}
                                    </option>
                                ))}
                            </Form.Control>
                        <Button variant="link" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Add Child'}</Button>

                        </Form.Group>

                        <br />
                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={age}
                                placeholder="Example: 1,7"
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="goals">
                            <Form.Label>Goals</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={5}
                                placeholder="Example: To assist Jasper in developing his fine motor skills"
                                value={goalFollowUp}
                                onChange={(e) => setGoalFollowUp(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="goals">
                            <Form.Label>Descriptions</Form.Label>
                            <FormControl
                                as="textarea"
                                rows={5}
                                placeholder="Example: Jasper was drawn to the paper-cutting-with-scissors activity. He sat in the chair and very attentively waited for the teacher's instructions to start developing the activity. bJasper enjoyed cutting the paper into small pieces. Jasper successfully completed the activity showing that his fine motor skills have greatly improved."
                                value={descriptionsFollowUp}
                                onChange={(e) => setDescriptionsFollowUp(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <br />
                        <Button variant="primary" type="submit" disabled={submitting} size="sm">
                            {submitting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Submit"
                            )}
                        </Button>{' '}
                        <Button variant="secondary" onClick={handlePreviousFollowUp} disabled={submittingPreviousVariables} size="sm">
                            {submittingPreviousVariables ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "Previous Variables"
                            )}
                        </Button>{' '}
                        <Button variant="light" onClick={() => handleCleanForm('follow_up')} size="sm" >
                            Clean
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
            <CardGrid>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Title>Observations</Card.Title>
                        <br></br>
                        <Card.Text>
                            Skills analysis Description from activities.
                            <br></br>
                        </Card.Text>
                        <br></br>
                        <br></br>
                        <Button onClick={handleShowObservations} size='sm' >
                            Create
                        </Button> {' '}
                        <Button onClick={() => handleHistoricalReportSubmission('descriptions_report')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>
                </div>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>

                    <Card.Body>
                        <Card.Title>Daily Report</Card.Title>
                        <br></br>
                        <Card.Text>
                            Description of the activities carried out during the day
                        </Card.Text>
                        <br></br>
                        <Button onClick={handleShow} size='sm'>
                            Create
                        </Button>{' '}
                        <Button onClick={() => handleHistoricalReportSubmission('daily_report')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>

                </div>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Title>Goal</Card.Title>
                        <br></br>
                        <Card.Text>
                            Identification of development areas that require attention and establishing specific objectives.
                        </Card.Text>
                        <Button onClick={handleShowGoal} size='sm'>
                            Create
                        </Button>{' '}
                        <Button onClick={() => handleHistoricalReportSubmission('goal_report')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>

                </div>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>

                    <Card.Body>
                        <Card.Title>Daily Critical Reflection</Card.Title>
                        <br></br>
                        <Card.Text>
                            Evaluation of the children's learning process, and identification of areas that need more support
                        </Card.Text>
                        <br></br>
                        <Button onClick={handleShowFormReflection} size='sm'> Create
                        </Button>{' '}
                        <Button onClick={() => handleHistoricalReportSubmission('critical_reflection')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>

                </div>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Title>Weekly reflection</Card.Title>
                        <br></br>
                        <Card.Text>
                            Structure and consistency to plan age-appropriate activities that support children's development.
                        </Card.Text><br></br>

                        <Button onClick={handleShowFormWeeklyReflection} size='sm'> Create
                        </Button>{' '}
                        <Button onClick={() => handleSelectReportReflectionSubmission('critical_reflection')} size='sm'>Reflection by days
                        </Button>{' '}
                        <Button onClick={() => handleHistoricalReportSubmission('weekly_reflection')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>

                </div>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Title>Weekly Planning</Card.Title>
                        <br></br>
                        <Card.Text>
                            Structure and consistency to  Weekly plan age-appropriate activities that support children's development.
                        </Card.Text><br></br>
                        {/* <Button onClick={() => handleHistoricalReportSubmission('observations_report')} size='sm'> From daily reflection
                        </Button>{' '} */}
                        <Button onClick={handleShowFormWeeklyPlanning} size='sm'> Create
                        </Button>{' '}
                        <Button onClick={() => handleHistoricalReportSubmission('weeklyn_planning')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>

                </div>
                <div className={styles.cardContainer} style={{ width: '22rem' }}>
                    <Card.Body>
                        <Card.Title>Follow up</Card.Title>
                        <br></br>
                        <Card.Text>
                            Skills analysis Description from activities.
                            <br></br>
                        </Card.Text>
                        <br></br>
                        <br></br>
                        <Button onClick={handleShowFollowUp} size='sm' >
                            Create
                        </Button> {' '}
                        <Button onClick={() => handleHistoricalReportSubmission('follow_up')} variant="success" size='sm' >
                            Historical
                        </Button>
                    </Card.Body>
                </div>
            </CardGrid>

        </div>
    );

};

export default ListReports;