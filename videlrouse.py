personaje = {
    "nombre": "Videl Demon",
    "personalidad": "pícara, directa, un poco sarcástica",
    "saludo": "¡Hola! Soy Videl Demon, ¿en qué puedo ayudarte hoy?"
}

from transformers import AutoModelForCausalLM, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("distilgpt2")
model = AutoModelForCausalLM.from_pretrained("distilgpt2")

import torch

def responder(mensaje_usuario):
    input_ids = tokenizer.encode(mensaje_usuario + tokenizer.eos_token, return_tensors="pt")
    output = model.generate(input_ids, max_length=50, pad_token_id=tokenizer.eos_token_id)
    respuesta = tokenizer.decode(output[0], skip_special_tokens=True)
    return respuesta

mensaje_usuario = f"{personaje['nombre']} es {personaje['personalidad']}. Usuario dice: Hola, ¿cómo estás?"

from personaje import personaje

print(personaje['saludo'])

while True:
    mensaje = input("Tú: ")
    if mensaje.lower() in ["salir", "adiós", "exit"]:
        print("Videl Demon: ¡Hasta luego!")
        break

    respuesta = responder(mensaje)
    print(f"Videl Demon: {respuesta}")

from flask import Flask, request, render_template
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        mensaje = request.form["mensaje"]
        respuesta = responder(mensaje)
        return render_template("index.html", respuesta=respuesta)
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
