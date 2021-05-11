from flask import Flask
import datetime
from flask import request # used to parse payload
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
from flask import render_template
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from summarizer import Summarizer
from flask import abort
from flask_cors import CORS

# define a variable to hold you app
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/time', methods=['GET'])
def get_time():
    return str(datetime.datetime.now())

@app.route('/api/summarize', methods=['GET'])
def GetUrl():
    """
    Called as /api/summarize?youtube_url='url'
    """
    # if user sends payload to variable name, get it. Else empty string
    video_url = request.args.get('youtube_url', '') 
    # if(len(video_url) == 0) or (not '=' in video_url):
    #   print("f")
    #   abort(404)
    
    video_id = video_url.split('=')[1]
    response = GetTranscript(video_id)
    return response

def abs_sum(text, model, tokenizer):

    tokens_input = tokenizer.encode("summarize: "+text, return_tensors='pt',
                                    max_length=tokenizer.model_max_length,
                                    truncation=True)

    summary_ids = model.generate(tokens_input, min_length=80, max_length=150,
                                length_penalty=15, num_beams=4)

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary

def Summarize(text):
    model = AutoModelForSeq2SeqLM.from_pretrained('t5-base')
    tokenizer = AutoTokenizer.from_pretrained('t5-base')
    bert_model = Summarizer()
    ext_summary = bert_model(text, max_length=400)

    summary_2 = abs_sum(ext_summary, model, tokenizer)
    return summary_2

# video id are the last characters in the link of youtube video
def GetTranscript(video_id):
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    formatter = TextFormatter()
    text_formatted = formatter.format_transcript(transcript)
    f = open('transcript.txt', 'w', encoding='utf-8')
    f.write(text_formatted)
    # print(text_formatted)
    # return text_formatted
    return Summarize(text_formatted)

# server the app when this file is run
if __name__ == '__main__': 
  app.run()