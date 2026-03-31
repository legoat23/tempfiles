from flask import Flask, jsonify
from parameters import Parameters

app = Flask(__name__)

@app.route("/api/score", methods=["GET"])
def get_score():
    theparam = Parameters()

    categories = ["deterministic"]
    prompt = "What is the capital of Japan?"

    thresholds = theparam.get_thresholds(categories)

    print("THRESHOLDS")
    print(thresholds)

    result = theparam.compute_standing(
        metric="semantic_entropy",
        categories=categories,
        prompt=prompt
    )

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)