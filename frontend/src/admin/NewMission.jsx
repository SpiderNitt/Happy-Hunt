import React from 'react';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';



const NewMission = () => {
    const formik = useFormik({
        initialValues: {
            Category: '',
            clue: '',
            answer: '',
            Other_Info: '',
            answer_Type: '',
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
                    id="Category"
                    name="Category"
                    label="Category"
                    value={formik.values.Category}
                    onChange={formik.handleChange}
                    error={formik.touched.Category && Boolean(formik.errors.Category)}
                    helperText={formik.touched.Category && formik.errors.Category}
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
                    id="answer_Type"
                    name='answer_Type'
                    label="Answer Type"
                    value={formik.values['answer_Type']}
                    error={formik.touched['answer_Type'] && Boolean(formik.errors['answer_Type'])}
                    helperText={formik.touched['answer_Type'] && formik.errors['answer_Type']}
                    fullWidth
                >
                    <option value='picture'>Picture</option>
                    <option value='location'>Location</option>
                    <option value='text'>Text</option>
                </Select>
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
    );
};


export default NewMission;

