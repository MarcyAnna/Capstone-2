const db = require("../db");
const User = require("../models/user");
const Symptom = require("../models/symptom");
const Condition = require("../models/condition");

jest.mock("../db", () => ({
    query: jest.fn(),
}));


describe("Test Models", function () {
    //test to register new user
    test("can register User", async () => {
        const mockResult = {
            rows: [{ id: '12345678' }],
        };
        db.query.mockResolvedValueOnce(mockResult);
        let u = await User.register(
            "12345678",
            "Test",
            "User",
            "12/12/1212",
            "testuser@gmail.com",
        );
        expect(u.id).toBe("12345678");
    });

    test("can get User by id", async () => {
        //test to get user by id, returns user and user.conditions
        const mockUserResult = {
            rows: [{ firstName: 'Test' }],
        };
        db.query.mockResolvedValueOnce(mockUserResult);
        const mockConditionsResult = {
            rows: [{ condition_name: 'Rheumatoid Arthritis' }],
        };
        db.query.mockResolvedValueOnce(mockConditionsResult);
        let u = await User.getUser("12345678");
        expect(u.firstName).toBe("Test")
        expect(u.conditions).toEqual(['Rheumatoid Arthritis']);
    })

    test("getConditions", async () => {
        //test to get all conditions
        const mockResult = {
            rows: [{ conditionName: 'Rheumatoid Arthritis' }],
        };
        db.query.mockResolvedValueOnce(mockResult);
        const res = await Condition.getConditions();
        expect(res[0].conditionName).toBe("Rheumatoid Arthritis");
    })

    test("add condition to User profile", async () => {
        //test to add condition to user profile with condition id and user id
        const mockResult = {
            rows: [{ user_id: '12345678', condition_id: 1 }],
        };
        db.query.mockResolvedValueOnce(mockResult);
        const user_id = "12345678";
        const condition_id = { conditionId: 1 }
        let c = await Condition.addCondition(
            user_id,
            condition_id
        );
        expect(c.user_id).toBe(user_id);
        expect(c.condition_id).toBe(1);
    })

    test('can get all symptoms', async () => {
        const mockResult = {
            rows: [
                { symptomName: 'Headache', description: 'Pain in the head' },
                { symptomName: 'Fever', description: 'Elevated body temperature' },
            ],
        };
        db.query.mockResolvedValueOnce(mockResult);
        const symptoms = await Symptom.getSymptoms();
        expect(symptoms).toEqual(['Headache', 'Fever']);
    });

    test('can create daily symptom log', async () => {
        const mockResult = {
            rows: [{ user_id: '12345678', symptom_name: 'Headache', severity: 'Mild' }],
        };
        db.query.mockResolvedValueOnce(mockResult);
        const symptomLog = await Symptom.createSymptomLog('12345678', 'Headache', 'Mild');
        expect(symptomLog).toEqual({ user_id: '12345678', symptom_name: 'Headache', severity: 'Mild' });
    });

    test('can get symptom log by date', async () => {
        const mockResult = {
            rows: [
                { symptom_name: 'Headache', severity: 'Mild' },
                { symptom_name: 'Fever', severity: 'High' },
            ],
        };
        db.query.mockResolvedValueOnce(mockResult);
        const logByDate = await Symptom.getLogByDate({ date: '2023-01-01', user_id: '12345678' });
        expect(logByDate).toEqual([
            { symptom_name: 'Headache', severity: 'Mild' },
            { symptom_name: 'Fever', severity: 'High' },
        ]);
    });

    test('can get all dates of symptom log by symptom name', async () => {
        const mockResult = {
            rows: [{ log_date: '2023-01-01' }, { log_date: '2023-01-02' }],
        };
        db.query.mockResolvedValueOnce(mockResult);
        const logBySymptom = await Symptom.getLogByName('12345678', 'Headache');
        expect(logBySymptom).toEqual([{log_date: '2023-01-01'}, {log_date: '2023-01-02'}]);
    });


})