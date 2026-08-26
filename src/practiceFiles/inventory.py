inventory = [
    {"id": 1, "name": "Health Potion", "category": "potion", "quantity": 3, "value": 25},
    {"id": 2, "name": "Iron Sword", "category": "weapon", "quantity": 1, "value": 120},
    {"id": 3, "name": "Mana Potion", "category": "potion", "quantity": 5, "value": 30},
    {"id": 4, "name": "Dragon Scale", "category": "material", "quantity": 2, "value": 250},
]

def get_inventory_summary(inventory):
    items = 0
    value = 0
    top_item = max(inventory, key=lambda item: item['value'])
    for item in inventory:
        items += item["quantity"]
        value += item["value"] * item["quantity"]
    return {"total_items": items, "total_value": value, "most_valueable_item": top_item['name']}

def get_items_by_category(inventory, category):
    return [item for item in inventory if item["category"] == category]
    