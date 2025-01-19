from diffusers import StableDiffusionPipeline
import torch

# Load Stable Diffusion model
pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v-1-4-original")

# For M1/M2 Macs (Metal backend), you don't need CUDA, so use CPU or the Metal backend if available
pipe.to("mps")  # 'mps' is for macOS Metal API

# Generate an image based on your text prompt
prompt = "A beautiful landscape painting"
image = pipe(prompt).images[0]

# Save the generated image
image.save("generated_image.png")
