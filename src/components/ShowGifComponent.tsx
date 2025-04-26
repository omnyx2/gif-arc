import React from 'react';
import  BitmapRenderer from './Bitmap';
import { MessageContent } from './ChatMessage';

type Bitmap =  number[][];

interface Task {
    input: Bitmap | string;
    output: Bitmap | string;
    solution: string;
}

interface ParsedData {
    task: Task[];
}

interface SingleParsedData {
    task: Task;
    id: number;
}

interface ShowGifComponentProps {
    inputString: MessageContent | undefined;
}

const renderSingleParseData = ({ task, id }: SingleParsedData) => {
    const CELL_SIZE = 10;
    return (
        <div key={id} style={{ margin: '20px' }}>
            <h3> 작업:</h3>
            <h3>Input Visualization:</h3>
            <p><strong>Input:</strong> 다음은 입력입니다.</p>
            {typeof task.input === 'string' ? (
                <p>{task.input}</p>
            ) : (
                <BitmapRenderer data={task.input} cellsize={CELL_SIZE} />
            )}
            <p><strong>Output:</strong> 다음을 출력입니다</p>
            {typeof task.output === 'string' ? (
                <p>{task.output}</p>
            ) : (
                <BitmapRenderer data={task.output} cellsize={CELL_SIZE} />
            )}
            <p style={{ width: CELL_SIZE * task.input.length}}><strong>Solution:</strong> {task.solution}</p>
            </div>
    );
}



const ShowGifComponent: React.FC<ShowGifComponentProps> = ({ inputString }) => {
    if (inputString === undefined || inputString === null) {
        return <div>입력 문자열이 없습니다.</div>;
    }
    if (typeof inputString !== 'string') {
        return <div>입력 문자열이 잘못되었습니다.</div>;
    }
    // Extract JSON block from the input string
    const jsonMatch = inputString.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch || !jsonMatch[1]) {
        return <div>JSON 문자열을 추출할 수 없습니다.</div>;
    }

    const jsonString = jsonMatch[1];
    // Parse the JSON string
    let parsedData: ParsedData;
    try {
        parsedData = JSON.parse(jsonString);
    } catch (error) {
        return <div>JSON 파싱 오류: {String(error)}</div>;
    }

    // Get the last task
    const lastTask = parsedData.task[parsedData.task.length - 1];
    if (!lastTask) {
        return <div>마지막 작업을 찾을 수 없습니다.</div>;
    }

    return (
        <div style={{ marginBottom: '20px', display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            {
              parsedData.task.map((e,id) => 
                <div key={id} style={{ marginBottom: '20px' }}>
                    {renderSingleParseData({ task: e, id })}
                </div>
            )}
        </div>
    )
     

  
};

export default ShowGifComponent;
