#### Database modeling and design problem

##### Explanation

We will provide some information about a business problem including some inputs and outputs and some simplified data shapes. We'd like you to read through the problem and come up with a design that will solve the problem by modifying or adding to the existing structures. You may express your design in a diagram like an ERD or in plain but specific descriptive language. Be sure to indicate any notable constraints, keys or other limitations on the entities or attributes.

##### Assumptions and Given data Structures

When a customer does business with us we store that fact in our database as a `deal` record. During the course of servicing that customer's deal we would like our employees to be assigned to a customer's deal. We keep record of our employees in our database as an `employee` record. 

When employees are assigned to a deal it is in a specific role. The roles are: `customer success specialist`, `loan officer`, `loan advisor`, `deal specialist`. That assignment is unique for that employee and deal, however, employees can be assigned to the same deal in multiple roles at the same time. Employees can be assigned to mulitple deals as well.

* Assume that there is a table called `deal` and it contains a unique primary key `id` a timestamp `created` date and a timestamp for `updated` date and some additional fields `v` a string that can range from 1 to 128 chars which will always be provided, and `w` a number like 1.02 which will always be provided. Each record in the `deal` table represents a unique customer `deal`.
* Asuume that there is a table called `employee` and it contains a unique primary key `id` a timestamp `created` date and a timestamp for `updated` date and some additional fields, `x` a 15 character long string which will always be provided, `y` an integer that defaults to 10. Each record in the `employee` table represents a unique `employee`.

**Question** 

We would like to store these assignments and use them for reporting and our internal website. We want to be sure that for a deal we can see all assignments that have ever been made. We would like to be able to order them based on when an assignment occured and ended (if ever). We'd like to be able to see from an employee's perspective how many deals and in what roles they are currently assigned as well as what roles they've been assigned historically.

**One note**: We expect that we will add additional types of roles in the future. The common name we use for roles will never exceed 100 characters

Please describe the model you arrive at including the existing tables and the additions or modifications to the database you would make to best achieve the stated goals.