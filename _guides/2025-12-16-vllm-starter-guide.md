---
layout: single
title:  "vLLM starter Guide"
date:   2025-12-14
categories: guide
---

This is a kind of guide made by a man to just satisfy their curiosity.
## The Starter Thing to *See*
This is a very first thing on how to approach the development phase of LLM app using [vLLM](https://docs.vllm.ai/en/latest/)

### There are 2 approaches
using class and API method

#### Class Way (Offline Batched Inference)
```python
from vllm import LLM, SamplingParams
prompts = [
    "Hello, my former name is",
    "The president of the Indonesia Nation is",
    "The capital city of East Java is",
    "The future of Explainable LLM is",
]
sampling_params = SamplingParams(temperature=0.8, top_p=0.95)

llm = LLM(model="zai-org/GLM-4.6V-Flash")

outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    prompt = output.prompt
    generated_text = output.outputs[0].text
    print(f"Prompt: {prompt!r}, Generated text: {generated_text!r}")
```

#### API ways (OpenAI Completions API with vLLM)
Put it inside a .sh file for convenient

```bash
curl http://localhost:8000/v1/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "OpenGVLab/InternVL2_5-78B",
        "prompt": "San Francisco is a",
        "max_tokens": 7,
        "temperature": 0
    }'
```

That is for now. I will come back with better English and content soon.
Hmm, I wonder what I should do now. Maybe I should do a Ruby Code here

{% highlight ruby %}
def hello_world
  puts "Hello from Jekyll!"
end
{% endhighlight %}

### Here is my custom output: {% hello_ruby %}
