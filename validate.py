import json
import os

def load_json(path):
    with open(path, "r") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)

# Load data
players_dir = "players"
economy = load_json("economy.json")

# Validate all player transactions
for player_file in os.listdir(players_dir):
    if player_file.endswith(".json"):
        player_path = os.path.join(players_dir, player_file)
        player = load_json(player_path)

        # Validate transactions
        for resource, amount in player.get("inventory", {}).items():
            if resource in economy["resources"]:
                max_possible = player["money"] // economy["resources"][resource]["price"]
                if amount > max_possible:
                    print(f"ERROR: Invalid purchase in {player_file}: Too much {resource}")
                    exit(1)  # FAIL

# If everything is valid, approve the commit
print("✅ All transactions valid!")
exit(0)
