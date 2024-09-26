import fs from 'fs/promises'

const getFileData = async <T> (resource: string): Promise<T[]> => {
    try{
        const data = await fs.readFile(`${__dirname}/../../data/${resource}.json`, 'utf-8');
        const parsedData: T[] = JSON.parse(data);
        return parsedData
    } catch(err) {
        throw err
    }
}

const saveFileData = async <T> (resource: string, data: T[]): Promise<void> => {
    try{
        const stringifiedData = JSON.stringify(data, null, 2);
        await fs.writeFile(`${__dirname}/../../data/${resource}.json`, stringifiedData, {encoding: 'utf-8'});
    } catch(err) {
        throw err
    }
}

export {getFileData, saveFileData}