import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import client from '../api/client';
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Message from '../components/Message';

const categories = ['Riddles', 'Cryptic', 'Graphic', 'Factoids', 'Bonus'];
const answerTypes = ['Picture', 'Video', 'Picture and Location', 'Text']

const dummyData = {
    mission: {
        Category: 'Graphic',
        MissionName: 'Sample Mission Name',
        clue: [
            {
                text: 'Hi',
                photos: ''
            },
            {
                text: 'Hello world',
                photos: ''
            }
        ],
        Location: {
            Lat: 12.34,
            Long: 23.00
        },
        answer_Type: 'Picture',
        answer: ['orange', 'apple', 'mango'],
        maxPoints: 0,
        Other_Info: 'Sample other info',

    },
    hint: [
        {
            Content: 'I am the hint 1',
            MaxPoints: 10
        }, {
            Content: 'I am the hint 2',
            MaxPoints: 10
        }
    ]
}

const EditMission = (props) => {
    const { history } = props;
    const [data, setData] = useState(dummyData)
    const [messageType, setmessageType] = useState('');
    const [info, setInfo] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.get(`api/mission/${props.match.params.id}`);
            console.log(result.data);
            setData(result.data);
        }
        fetchData()
    }, []);
    const getLocation = (term) => {
        if (data.mission.Location) {
            if (term === 'Lat') {
                return data.mission.Location.Lat;
            }
            else {
                return data.mission.Location.Long;
            }
        }
        else {
            return '';
        }
    }
    const getHint = (term, index) => {
        if (data.hint.length === 0) {
            return ''
        }
        else {
            if (term === 'hint') {
                return data.hint[index].Content;
            }
            else {
                return data.hint[index].MaxPoints;
            }
        }
    }
    const getClueText = (index) => {
        if (index <= data.mission.clue.length - 1) {
            return data.mission.clue[0].text
        }
        else {
            return '';
        }
    }
    const checkBonus = (category) => {
        if (category === 'Bonus') {
            return true;
        }
        else {
            return false;
        }
    }
    const formik = useFormik({
        initialValues: {
            Category: data.mission['Category'],
            MissionName: data.mission['MissionName'],
            clue1: getClueText(0),
            clue2: getClueText(1),
            Other_Info: data.mission['Other_Info'],
            maxPoints: data.mission['maxPoints'],
            answer: data.mission['answer'].join(","),
            answer_Type: data.mission['answer_Type'],
            Lat: getLocation('Lat'),
            Long: getLocation('Long'),
            hint1: getHint('hint', 0),
            maxPointsHint1: getHint('maxPoints', 0),
            hint2: getHint('hint', 1),
            maxPointsHint2: getHint('maxPoints', 1),
        },
        enableReinitialize: true,
        onSubmit: async (values) => {

            const { Category, clue2, answer, answer_Type, Other_Info, Lat, Long, maxPoints, MissionName, clue1, hint1, maxPointsHint1, hint2, maxPointsHint2,Photos } = values;
            let answerArray = [];
            answerArray = answer.split(',');
            const cluesArray = [];
            if (clue1 !== "") {
                cluesArray.push(clue1);
            }
            if (clue2 !== "") {
                cluesArray.push(clue2);
            }
            let hintsArray = [];
            if (Category !== 'Bonus') {
                hintsArray.push({ 'Content': hint1, 'MaxPoints': maxPointsHint1 });
                hintsArray.push({ 'Content': hint2, 'MaxPoints': maxPointsHint2 });
            }
            const object = {
                id: data.mission['_id'],
                Category,
                isBonus: checkBonus(Category),
                answer_Type,
                Other_Info,
                Location: {
                    Lat,
                    Long
                },
                MissionName,
                maxPoints,
            };
            const formData = new FormData();
            for(let key in object) {
               if(typeof(object[key]) === 'object') {
                   for (let subKey in object[key]) {
                      formData.append(`${key}[${subKey}]`, object[key][subKey]);
                   }
               }
               else {
                    formData.append(key, object[key]);
                }
            }
            for(let i=0;i<answerArray.length;i++){
                formData.append('answer',answerArray[i]);
            }
            for(let i=0;i<cluesArray.length;i++){
                formData.append('clue',cluesArray[i]);
            }
            if(hintsArray.length > 0){
                formData.append('Hints',JSON.stringify(hintsArray));
            }
            if(Photos){
                for(let i=0;i<Photos.length;i++){
                    formData.append('Photos',Photos[i]);
                }
            }
            const response = await client.post('api/admin/mission/update', formData);
            console.log(response);
            if(response.ok){
              setInfo(response.data.message);
              setmessageType("success")
            }
            else{
              setInfo('Cannot update mission. Fill all the fields properly');
              setmessageType("error")
            }
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
            {info && <Message message={info} show={true} type={messageType} />}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                marginTop: '150px',
                width: '600px',
            }}>
                <h3 style={{ textAlign: 'center' }}>Edit Mission</h3>
                <p>Please upload images if necessary while editing any field.</p>
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
                    {(formik.values.clue1 !== "") &&
                        <div>
                            <br /><br />
                            <div className="form-group">
                                <input id="file" name="file" type="file" multiple onChange={(event) => {
                                    formik.setFieldValue("Photos", event.currentTarget.files);
                                }} />
                            </div>
                            <br />
                        </div>
                    }
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
                    <TextField
                        fullWidth
                        id="answer"
                        name="answer"
                        label="Answer (Multiple answers are to be separated by commas)"
                        value={formik.values.answer}
                        onChange={formik.handleChange}
                        error={formik.touched.answer && Boolean(formik.errors.answer)}
                        helperText={formik.touched.answer && formik.errors.answer}
                    />
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
                        label="Maximum points for the mission"
                        type="number"
                        value={formik.values.maxPoints}
                        onChange={formik.handleChange}
                        error={formik.touched.maxPoints && Boolean(formik.errors.maxPoints)}
                        helperText={formik.touched.maxPoints && formik.errors.maxPoints}
                    />
                    {formik.values.Category !== 'Bonus' &&
                        <div>
                            <TextField
                                fullWidth
                                id="hint1"
                                name="hint1"
                                label="Hint 1"
                                value={formik.values['hint1']}
                                onChange={formik.handleChange}
                                error={formik.touched['hint1'] && Boolean(formik.errors['hint1'])}
                                helperText={formik.touched['hint1'] && formik.errors['hint1']}
                            />
                            <TextField
                                fullWidth
                                id="maxPointsHint1"
                                name="maxPointsHint1"
                                label="Maximum points for Hint 1"
                                type="number"
                                value={formik.values.maxPointsHint1}
                                onChange={formik.handleChange}
                                error={formik.touched.maxPointsHint1 && Boolean(formik.errors.maxPointsHint1)}
                                helperText={formik.touched.maxPointsHint1 && formik.errors.maxPointsHint1}
                            />
                            <TextField
                                fullWidth
                                id="hint2"
                                name="hint2"
                                label="Hint 2"
                                value={formik.values['hint2']}
                                onChange={formik.handleChange}
                                error={formik.touched['hint2'] && Boolean(formik.errors['hint2'])}
                                helperText={formik.touched['hint2'] && formik.errors['hint2']}
                            />
                            <TextField
                                fullWidth
                                id="maxPointsHint2"
                                name="maxPointsHint2"
                                label="Maximum points for Hint 2"
                                type="number"
                                value={formik.values.maxPointsHint2}
                                onChange={formik.handleChange}
                                error={formik.touched.maxPointsHint2 && Boolean(formik.errors.maxPointsHint2)}
                                helperText={formik.touched.maxPointsHint2 && formik.errors.maxPointsHint2}
                            />
                        </div>
                    }
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};


export default withRouter(EditMission);

