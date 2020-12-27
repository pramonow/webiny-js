import { useAdminGqlHandler } from "../utils/useAdminGqlHandler";

describe("Settings crud test", () => {
    const { isInstalledQuery, installMutation, elasticSearch } = useAdminGqlHandler();

    const esCmsIndex = "root-headless-cms";

    beforeEach(async () => {
        try {
            await elasticSearch.indices.create({ index: esCmsIndex });
        } catch {
            // Ignore errors
        }
    });

    afterEach(async () => {
        try {
            await elasticSearch.indices.delete({ index: esCmsIndex });
        } catch (e) {}
    });

    test("cms is not installed", async () => {
        const [response] = await isInstalledQuery();
        expect(response).toEqual({
            data: {
                cms: {
                    isInstalled: {
                        data: false,
                        error: null
                    }
                }
            }
        });

        const [afterInsertResponse] = await isInstalledQuery();
        expect(afterInsertResponse).toEqual({
            data: {
                cms: {
                    isInstalled: {
                        data: false,
                        error: null
                    }
                }
            }
        });
    });

    test("cms is installed", async () => {
        await installMutation();

        const [response] = await isInstalledQuery();
        expect(response).toEqual({
            data: {
                cms: {
                    isInstalled: {
                        data: true,
                        error: null
                    }
                }
            }
        });
    });

    test("cms is already installed", async () => {
        await installMutation();

        const [response] = await installMutation();
        expect(response).toEqual({
            data: {
                cms: {
                    install: {
                        data: null,
                        error: {
                            message: "The app is already installed.",
                            code: "CMS_INSTALLATION_ERROR",
                            data: null
                        }
                    }
                }
            }
        });
    });

    test("cms install", async () => {
        const [response] = await installMutation();
        expect(response).toEqual({
            data: {
                cms: {
                    install: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        const [isInstalledResponse] = await isInstalledQuery();
        expect(isInstalledResponse).toEqual({
            data: {
                cms: {
                    isInstalled: {
                        data: true,
                        error: null
                    }
                }
            }
        });
    });
});