import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string;
}
export default class Crowller {
  constructor(private url: string, private analyzeer: Analyzer) {
    this.initSpiderProcess();
  }

  private filePath = path.resolve(__dirname, '../../data/course.json');
  // get rawhtml by using superagent
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  // save stored file to local JSON file

  private wirteFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzeer.analyzer(html, this.filePath);
    this.wirteFile(fileContent);
  }
}
