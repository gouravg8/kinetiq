"use client";
import { Save } from "lucide-react";
import {
    Modal,
    Form,
    Select,
    Button,
    Space,
    Typography,
    Checkbox
} from "antd";
import { LogsDataType } from "./WeeklyView";

const { Option } = Select;

// type Exercise = {
//     name: string;
//     sets: string;
//     reps: string;
//     weight: string;
// };

export type WorkoutType = {
    bodyPart: string;
    // exercises: Exercise[];
    isCompleted: boolean;
};

interface WorkoutModalProps {
    open: boolean;
    data?: LogsDataType;
    onSave: (workoutData: WorkoutType) => void;
    onClose: () => void;
}

interface FinishFormValues {
    bodyPart: string;
    completed: boolean;
}

// Sample exercise options
const exerciseOptions = {
    "Chest": ["Push-ups", "Bench Press", "Incline Press", "Dips"],
    "Back": ["Pull-ups", "Deadlifts", "Rows", "Lat Pulldowns"],
    "Legs": ["Squats", "Lunges", "Leg Press", "Calf Raises"],
    "Biceps": [ "Bicep Curls", "Hammer Curls", "Concentration"],
    "Triceps": ["Single handl", "Double hands", "Overhead", "Push Down"],
    "Shoulders": ["Shoulder Press", "Lateral Raises", "Front Raises", "Shrugs"],
    "Core": ["Planks", "Crunches", "Russian Twists", "Leg Raises"],
    "Rest Day": [],
    "Cheat Day": []
};

function WorkoutModal({ open, data, onSave, onClose }: WorkoutModalProps) {
    const [form] = Form.useForm();
    // const [exercises, setExercises] = useState<Exercise[]>(data?.exercises || []);

    // const handleAddExercise = () => {
    //     setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
    // };

    // const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
    //     const newExercises = [...exercises];
    //     newExercises[index][field] = value;
    //     setExercises(newExercises);
    // };

    // const handleRemoveExercise = (index: number) => {
    //     const newExercises = exercises.filter((_, i) => i !== index);
    //     setExercises(newExercises);
    // };

    const handleFinish = (values: FinishFormValues) => {
        // const filteredExercises = exercises.filter(ex => ex.name.trim() !== '');
        const workoutData: WorkoutType = {
            bodyPart: values.bodyPart || '',
            // exercises: filteredExercises,
            isCompleted: values.completed || false
        };
        onSave(workoutData);
        onClose();
    };

    const handleCancel = () => {
        form.resetFields();
        // setExercises(data?.exercises || []);
        onClose();
    };

    const handleSelectChange = () => {
        form.setFieldsValue({ completed: false });
    };


    return (
        <Modal
            title={data?.id ? "Edit Workout" : "Add Workout"}
            open={open}
            onCancel={handleCancel}
            footer={null}
            centered
            width={600}
            className="workout-modal"
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    bodyPart: data?.bodyPart || undefined,
                    completed: data?.isCompleted || false
                }}
            >
                <Form.Item
                    label="Body Part"
                    name="bodyPart"
                    rules={[{ required: true, message: 'Please select a body part!' }]}
                >
                    <Select onChange={handleSelectChange} mode="multiple" placeholder="Select body part" size="large" allowClear>
                        {Object.keys(exerciseOptions).map(part => (
                            <Option key={part} value={part}>{part}</Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* <div className="exercises-section">
                    <div className="flex justify-between items-center mb-4">
                        <Title level={4} style={{ margin: 0 }}>Exercises</Title>
                        <Button
                            type="dashed"
                            icon={<Plus size={16} />}
                            onClick={handleAddExercise}
                        >
                            Add Exercise
                        </Button>
                    </div>

                    {exercises.map((exercise, index) => (
                        <Card
                            key={index}
                            size="small"
                            className="mb-3"
                            extra={
                                <Button
                                    type="text"
                                    danger
                                    icon={<Trash2 size={16} />}
                                    onClick={() => handleRemoveExercise(index)}
                                />
                            }
                        >
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12">
                                    <Input
                                        placeholder="Exercise name"
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <Input
                                        placeholder="Sets"
                                        value={exercise.sets}
                                        onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <Input
                                        placeholder="Reps"
                                        value={exercise.reps}
                                        onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <Input
                                        placeholder="Weight (kg)"
                                        value={exercise.weight}
                                        onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div> */}

                <Form.Item
                    name="completed"
                    valuePropName="checked"
                >
                    <Checkbox>
                        <Typography.Text>Mark as Completed</Typography.Text>
                    </Checkbox>
                </Form.Item>

                <Form.Item className="mb-0">
                    <Space className="w-full justify-end">
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<Save size={16} />}
                        >
                            Save Workout
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default WorkoutModal;