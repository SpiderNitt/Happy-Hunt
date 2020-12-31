import React from 'react';
import { useFormik, Formik } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';



const NewMission = () => {
    const formik = useFormik({
        initialValues: {
            category: '',
            clue: '',
            password: '',
            answer: '',
            otherinfo: '',
            answertype: '',
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '10px',
            width: '600px'
        }}>
            <h3 style={{ textAlign: 'center' }}>Add a Mission</h3>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="category"
                    name="category"
                    label="Category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                />
                <TextField
                    fullWidth
                    id="clue"
                    name="clue"
                    label="Clue"
                    value={formik.values.clue}
                    onChange={formik.handleChange}
                    error={formik.touched.clue && Boolean(formik.errors.clue)}
                    helperText={formik.touched.clue && formik.errors.clue}
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
                <Select
                    onChange={formik.handleChange}
                    id="answertype"
                    name='answertype'
                    label="Answer Type"
                    value={formik.values.answertype}
                    error={formik.touched.answertype && Boolean(formik.errors.answertype)}
                    helperText={formik.touched.answertype && formik.errors.answertype}
                    fullWidth
                >
                    <option value='picture'>Picture</option>
                    <option value='location'>Location</option>
                    <option value='text'>Text</option>
                </Select>
                <TextField
                    fullWidth
                    id="latitude"
                    name="latitude"
                    label="Latitude"
                    value={formik.values.latitude}
                    onChange={formik.handleChange}
                    error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                    helperText={formik.touched.latitude && formik.errors.latitude}
                />
                <TextField
                    fullWidth
                    id="longitude"
                    name="longitude"
                    label="Longitude"
                    value={formik.values.longitude}
                    onChange={formik.handleChange}
                    error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                    helperText={formik.touched.longitude && formik.errors.longitude}
                />
                <TextField
                    fullWidth
                    id="otherinfo"
                    name="otherinfo"
                    label="Other Info"
                    value={formik.values.otherinfo}
                    onChange={formik.handleChange}
                    error={formik.touched.otherinfo && Boolean(formik.errors.otherinfo)}
                    helperText={formik.touched.otherinfo && formik.errors.otherinfo}
                />
                <TextField
                    fullWidth
                    id="maxpoints"
                    name="maxpoints"
                    label="Maximum points"
                    type="number"
                    value={formik.values.maxpoints}
                    onChange={formik.handleChange}
                    error={formik.touched.maxpoints && Boolean(formik.errors.maxpoints)}
                    helperText={formik.touched.maxpoints && formik.errors.maxpoints}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
        </Button>
            </form>
        </div>
    );
};


export default NewMission;

