import { User } from "@/models/User";
import { createConnection } from "typeorm";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { isPlatform } from "@ionic/vue";

const DBNAME = "testDB";

const useDb = () => {
    const createDBConnection = async (newDB: boolean, dbName: string, sqliteConnection: SQLiteConnection) => {
        return await createConnection({
            database: dbName,
            driver: sqliteConnection,
            mode: "secret",
            type: "capacitor",
            version: 1,
            entities: [User],
            logging: ["error", "query", "schema"],
            synchronize: newDB,
        });
    };

    const initDb = async (): Promise<void> => {
        if (!isPlatform("capacitor")) return;

        const connectionsConsistency = await CapacitorSQLite.checkConnectionsConsistency({ dbNames: [DBNAME] });
        console.log("connectionsConsistency: ", connectionsConsistency.result);
        if (connectionsConsistency.result) return;

        const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
        const isDatabase = await sqliteConnection.isDatabase(DBNAME);

        if (!isDatabase.result) {
            const secret = "secret";
            await sqliteConnection.setEncryptionSecret(secret);
            await createDBConnection(true, DBNAME, sqliteConnection);
            return;
        }
        await createDBConnection(false, DBNAME, sqliteConnection);
    };

    return {
        createDBConnection,
        initDb,
    };
};

export default useDb;