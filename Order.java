import java.util.*;
import java.util.stream.Collectors;

public class Order {

    private int id;
    private String description;
    private double amount;

    public Order(int id, String description, double amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public static void main(String[] args) {

        List<Order> orders = new ArrayList<>();

        orders.add(new Order(1, "Laptop", 1200.00));
        orders.add(new Order(2, "Mouse", 50.00));
        orders.add(new Order(3, "Keyboard", 80.00));
        orders.add(new Order(4, "Monitor", 300.00));
        orders.add(new Order(5, "USB Cable", 20.00));
        orders.add(new Order(6, "Headset", 150.00));
        orders.add(new Order(7, "Webcam", 200.00));
        orders.add(new Order(8, "Chair", 250.00));
        orders.add(new Order(9, "Desk", 500.00));
        orders.add(new Order(10, "Speaker", 180.00));

        System.out.println("=== Original Orders ===");
        orders.forEach(o ->
            System.out.println(o.getId() + " | " + o.getDescription() + " | " + o.getAmount())
        );

        orders.add(new Order(11, "Tablet", 400.00));

        orders.sort((o1, o2) -> Double.compare(o2.getAmount(), o1.getAmount()));

        System.out.println("\n=== Sorted Orders (Descending by Amount) ===");
        orders.forEach(o ->
            System.out.println(o.getId() + " | " + o.getDescription() + " | " + o.getAmount())
        );

        List<String> filteredDescriptions = orders.stream()
                .filter(o -> o.getAmount() > 150.00)
                .map(Order::getDescription)
                .collect(Collectors.toList());

        System.out.println("\n=== Orders with Amount > 150 (Descriptions Only) ===");
        filteredDescriptions.forEach(System.out::println);

        double average = orders.stream()
                .mapToDouble(Order::getAmount)
                .average()
                .orElse(0.0);

        System.out.println("\n=== Average Order Amount ===");
        System.out.println(average);

        Map<String, Double> groupedTotals = orders.stream()
                .collect(Collectors.groupingBy(
                        Order::getDescription,
                        Collectors.summingDouble(Order::getAmount)
                ));

        System.out.println("\n=== Total Amount per Description ===");
        groupedTotals.forEach((desc, total) ->
                System.out.println(desc + " : " + total)
        );
    }
}