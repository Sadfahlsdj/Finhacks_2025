import boto3
import io
import sys
import json
import base64
from PIL import Image

def make_ad(product):
    bedrock_client = boto3.client(service_name='bedrock-runtime', region_name='us-east-1',
                                  aws_access_key_id='',
                                  aws_secret_access_key='')
    
    accept = 'application/json'
    content_type = 'application/json'
    model_id = 'stability.stable-diffusion-xl-v1'
    prompt = f'Create an eye-catching advertisement featuring a {product}. The background should show the {product} in a setting where it is typically used, with vibrant colors and an appealing design.'

    body = json.dumps({
        'text_prompts': [
            {
                'text': prompt
            }
        ],
        'cfg_scale': 10,  # Corrected typo 'cfg_scle' to 'cfg_scale'
        'seed': 0,
    })

    # Corrected API call with properly named parameters
    response = bedrock_client.invoke_model(
        body=body, modelId=model_id, contentType=content_type, accept=accept
    )

    response_body = json.loads(response['body'].read())  # Updated to directly access the body key
    base64_image = response['artifacts'][0]['base64']
    base_bytes = base64_image.encode('ascii')
    image_bytes = base64.b64decode(base_bytes)

    image = Image.open(io.BytesIO(image_bytes))
    return image

def main():
    image = make_ad('tools')
    image.show()

if __name__ == '__main__':
    main()
