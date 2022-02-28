# GenericAlgorithm
Neural Network + GenericAlgorithm for Flappy Bird


Bài toán:
Dạy một con bot có thể an toàn vượt qua các chướng ngại vật lâu nhất có thể.


Luồng hoạt động:
1. Tạo ra quần thể bot với random neural Network(Mỗi quần thể có 10 cá thể)
2. Dạy bằng cách cho các con bot chơi game
3. Ứng dụng chọn lọc tự nhiên để tạo ra quần thể bot mới


Cấu trúc model:
1. Input 2 neurons
2. Hidden layer 6 neurons
3. Ouput 1 neurons


Input:
1. x1 khoảng cách đến pipe gần nhất
2. x2 khoảng cách đến tâm pipe gần nhất


![alt](https://github.com/duydung271/GenericAlgorithm/blob/main/demo/demo1.png)


Ouput: Dự đoán hành động flap. Nếu lớn hơn hoặc bằng 0.5 thì flap


Fitness: Tổng khoảng cách di chuyển được


Khi toàn bộ cá thể đã chết, 4 con bot có điểm fitness cao nhất sẽ được chọn để tạo ra quần thể mới.


Với 3 toán tử của generic algorithm:
1. selection
2. crossover
3. mutation

https://user-images.githubusercontent.com/69457259/155988625-cd827494-3553-4cab-b56c-db705facd722.mp4


