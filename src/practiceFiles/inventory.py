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

def get_low_stock_items(inventory, threshold):
    return [item for item in inventory if item['quantity'] <= threshold]

def restock_item(inventory, item_id, amount):
    for item in inventory:
        if item['id'] == item_id:
            item['quantity'] += amount
            return item
    return None

def remove_item(inventory, item_id):
    for index, item in enumerate(inventory):
        if item['id'] == item_id:
           return inventory.pop(index)
    return None        

def find_item_by_name(inventory, name):
    for item in inventory:
        if item['name'].lower() == name.lower():
            return item
    return None

def get_items_above_value(inventory, minimum_value):
    return [item for item in inventory if item["value"] * item["quantity"] >= minimum_value]

def sort_inventory_by_value(inventory):
    return sorted(inventory, key=lambda item: item['value'], reverse=True)

def get_category_totals(inventory):
    totals = {}
for item in inventory:
    if item["category"] not in totals:
        totals[item["category"]] = item["quantity"]
    else:
        totals["category"] += item['quantity']
return totals
        
            

