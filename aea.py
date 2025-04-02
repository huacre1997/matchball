def complete_inventory(warehouse_1, x, warehouse_2, y):
    back_index = len(warehouse_1) # 6
    first_pointer = x
    second_pointer = y
    while second_pointer > 0:
        if (
            first_pointer > 0
            and warehouse_1[first_pointer] > warehouse_2[second_pointer]
        ):
            warehouse_1[back_index] = warehouse_1[first_pointer]
        else:
            warehouse_1[back_index] = warehouse_2[second_pointer]
    return warehouse_1


result = complete_inventory(
    [
        2,
        3,
        4,
        0,
        0,
        0,
    ],
    int(3),
    [
        1,
        5,
        9,
    ],
    int(3),
)
print(result)
