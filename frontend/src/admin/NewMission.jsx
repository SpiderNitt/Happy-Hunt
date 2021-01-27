import React from 'react';
import { useFormik, Field } from 'formik';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import client from '../api/client';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const categories = ['Riddles', 'Cryptic', 'Graphic', 'Factoids', 'Bonus'];
const answerTypes = ['Picture', 'Video', 'Picture and Location', 'Text']

const NewMission = (props) => {
    const { history } = props;
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                formik.setFieldValue('file', fileReader.result);
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        await convertBase64(file);
    }
    const formik = useFormik({
        initialValues: {
            Category: '',
            clue1: '',
            clue2: '',
            answer: '',
            Other_Info: '',
            answer_Type: '',
            ServerEvaluation: ''
        },
        onSubmit: async (values) => {
            const { Category, clue2, answer, answer_Type, Other_Info, Lat, Long, maxPoints, MissionName, ServerEvaluation, clue1, file } = values;
            const answerArray = [];
            answerArray.push(answer);
            const cluesArray = [];
            if (clue2 === "") {
                cluesArray.push(clue1);
            }
            else {
                cluesArray.push(clue1);
                if (values.file !== undefined) {
                    cluesArray.push(clue2);
                    cluesArray.push(file);
                }
            }
            const object = {
                Category,
                clue: cluesArray,
                answer: answerArray,
                answer_Type,
                Other_Info,
                Location: {
                    Lat,
                    Long
                },
                MissionName,
                Feed: true,
                ServerEvaluation,
                maxPoints,
                Hints: [
                    {
                        Content: "hfbfrbfrfrfgrfbrjbfjrbgjrbgbr",
                        MaxPoints: 123
                    }, {
                        Content: "hfbfrbfrfrfgrfbrjbfjrbgjrbgbr",
                        MaxPoints: 123
                    }, {
                        Content: "hfbfrbfrfrfgrfbrjbfjrbgjrbgbr",
                        MaxPoints: 123
                    }
                ]
            };
            console.log(object)
            // const response = await client.post('api/admin/mission/add', object);
            // console.log(response);
        },
    });

    return (
        <div>
            <div style={{
                position: 'absolute',
                left: '23%',
                top: '20%',
                cursor: 'pointer',
            }} onClick={() => history.push('/admin/mission/update')}>
                <ArrowBackIcon fontSize="large" color="info" />
            </div>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '100px',
                width: '600px'
            }}>
                <h3 style={{ textAlign: 'center' }}>Add a Mission</h3>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="Category"
                        name="Category"
                        label="Category"
                        select
                        value={formik.values.Category}
                        onChange={formik.handleChange}
                        error={formik.touched.Category && Boolean(formik.errors.Category)}
                        helperText={formik.touched.Category && formik.errors.Category}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        id="MissionName"
                        name="MissionName"
                        label="Mission Name"
                        value={formik.values.MissionName}
                        onChange={formik.handleChange}
                        error={formik.touched.MissionName && Boolean(formik.errors.MissionName)}
                        helperText={formik.touched.MissionName && formik.errors.MissionName}
                    />
                    <TextField
                        fullWidth
                        id="clue1"
                        name="clue1"
                        label="Clue Part-A"
                        value={formik.values.clue1}
                        onChange={formik.handleChange}
                        error={formik.touched.clue1 && Boolean(formik.errors.clue1)}
                        helperText={formik.touched.clue1 && formik.errors.clue1}
                    />
                    <TextField
                        fullWidth
                        id="clue2"
                        name="clue2"
                        label="Clue Part-B"
                        value={formik.values.clue2}
                        onChange={formik.handleChange}
                        error={formik.touched.clue2 && Boolean(formik.errors.clue2)}
                        helperText={formik.touched.clue2 && formik.errors.clue2}
                    />
                    <TextField
                        fullWidth
                        id="answer"
                        name="answer"
                        label="Answer"
                        value={formik.values.answer}
                        onChange={formik.handleChange}
                        error={formik.touched.answer && Boolean(formik.errors.answer)}
                        helperText={formik.touched.answer && formik.errors.answer}
                    />
                    <TextField
                        fullWidth
                        id="answer_Type"
                        name="answer_Type"
                        label="Answer Type"
                        select
                        value={formik.values['answer_Type']}
                        onChange={formik.handleChange}
                        error={formik.touched['answer_Type'] && Boolean(formik.errors['answer_Type'])}
                        helperText={formik.touched['answer_Type'] && formik.errors['answer_Type']}
                    >
                        {answerTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Server Evaluation</FormLabel>
                        <RadioGroup aria-label="ServerEvaluation" name="ServerEvaluation" value={formik.values['ServerEvaluation']} onChange={formik.handleChange} row>
                            <FormControlLabel value='True' control={<Radio />} label="YES" />
                            <FormControlLabel value='False' control={<Radio />} label="NO" />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <div className="form-group">
                        <FormLabel component="legend">Image Upload</FormLabel>
                        <input type="file" onChange={(event) => {
                            handleImageUpload(event);
                        }} />
                    </div>
                    <TextField
                        fullWidth
                        id="Lat"
                        name="Lat"
                        label="Latitude"
                        value={formik.values.Lat}
                        onChange={formik.handleChange}
                        error={formik.touched.Lat && Boolean(formik.errors.Lat)}
                        helperText={formik.touched.Lat && formik.errors.Lat}

                    />
                    <TextField
                        fullWidth
                        id="Long"
                        name="Long"
                        label="Longitude"
                        value={formik.values.Long}
                        onChange={formik.handleChange}
                        error={formik.touched.Long && Boolean(formik.errors.Long)}
                        helperText={formik.touched.Long && formik.errors.Long}
                    />

                    <TextField
                        fullWidth
                        id="Other_Info"
                        name="Other_Info"
                        label="Other Info"
                        value={formik.values['Other_Info']}
                        onChange={formik.handleChange}
                        error={formik.touched['Other_Info'] && Boolean(formik.errors['Other_Info'])}
                        helperText={formik.touched['Other_Info'] && formik.errors['Other_Info']}
                    />
                    <TextField
                        fullWidth
                        id="maxPoints"
                        name="maxPoints"
                        label="Maximum points"
                        type="number"
                        value={formik.values.maxPoints}
                        onChange={formik.handleChange}
                        error={formik.touched.maxPoints && Boolean(formik.errors.maxPoints)}
                        helperText={formik.touched.maxPoints && formik.errors.maxPoints}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};


export default withRouter(NewMission);

